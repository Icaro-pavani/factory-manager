import bcrypt from "bcrypt";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as usersRepository from "../repositories/usersRepository.js";
import * as companiesRepository from "../repositories/companiesRepository.js";

export async function createUser(
  name: string,
  cpf: string,
  password: string,
  companyId: string
) {
  const userRegistered = await usersRepository.findByCpf(cpf);

  if (userRegistered) {
    throw conflictError("This cpf has already been registered!");
  }

  const userData = createUserData(name, cpf, password, companyId);
  await usersRepository.createUser(userData);
}

export async function updateUser(
  name: string,
  cpf: string,
  password: string,
  companyId: string,
  userId: string
) {
  const user = await usersRepository.findById(userId);

  if (!user) throw notFoundError("User not found!");

  const userData = createUserData(name, cpf, password, companyId);

  await usersRepository.update(userId, userData);
}

export async function getCompaniesUsers(companyId: string) {
  const users = await usersRepository.findAllByCompanyId(companyId);
  return users;
}

export async function deleteUserById(userId: string, companyId: string) {
  const user = await usersRepository.findById(userId);

  if (!user) {
    throw notFoundError("User not found!");
  }

  if (companyId !== user.companyId) {
    throw conflictError("This user belongs to other company!");
  }

  await usersRepository.remove(userId);
}

export async function getUserInfo(userId: string) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw notFoundError("User not found!");
  }

  const company = companiesRepository.findById(user.companyId);

  return { userName: user.name, companyName: (await company).name };
}

function createUserData(
  name: string,
  cpf: string,
  password: string,
  companyId: string
) {
  const SALT = 10;
  const hashPassword = bcrypt.hashSync(password, SALT);
  const userData: usersRepository.UserParams = {
    name,
    cpf,
    password: hashPassword,
    companyId,
  };

  return userData;
}

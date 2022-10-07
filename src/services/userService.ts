import bcrypt from "bcrypt";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as usersRepository from "../repositories/usersRepository.js";

export async function createUser(
  name: string,
  cpf: string,
  password: string,
  companyId: string
) {
  const SALT = 10;
  const userRegistered = await usersRepository.findByCpf(cpf);

  if (userRegistered) {
    throw conflictError("This cpf has already been registered!");
  }

  const hashPassword = bcrypt.hashSync(password, SALT);
  const userData: usersRepository.UserParams = {
    name,
    cpf,
    password: hashPassword,
    companyId,
  };
  await usersRepository.createUser(userData);
}

export async function getCompaniesUsers(companyId: string) {
  const users = await usersRepository.findAllByCompanyId(companyId);
  return users;
}

export async function deleteUserById(userId: string, companyId: string) {
  const user = await usersRepository.findById(userId);

  if (!user) {
    throw notFoundError("No user found with this id");
  }

  if (companyId !== user.companyId) {
    throw conflictError("This user belongs to other company!");
  }

  await usersRepository.remove(userId);
}

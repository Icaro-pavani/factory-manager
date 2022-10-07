import bcrypt from "bcrypt";
import {
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as companiesRepository from "../repositories/companiesRepository.js";
import * as usersRepository from "../repositories/usersRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

export async function signInCompany(cnpj: string, password: string) {
  const company = await getCompanyOrFail(cnpj);

  await validatePasswordOrFail(password, company.password);

  const token = tokenAPI.generateToken(company._id.toString(), "company");

  return token;
}

export async function singInUser(cpf: string, password: string) {
  const user = await getUserOrFail(cpf);

  await validatePasswordOrFail(password, user.password);

  const token = tokenAPI.generateToken(user._id.toString(), "user");

  return token;
}

async function getCompanyOrFail(cnpj: string) {
  const company = await companiesRepository.findByCnpj(cnpj);
  if (!company) throw notFoundError("No company with this CNPJ registered!");

  return company;
}

async function getUserOrFail(cpf: string) {
  const user = await usersRepository.findByCpf(cpf);
  if (!user) throw notFoundError("No user with this CPF registered!");

  return user;
}

async function validatePasswordOrFail(password: string, hashPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, hashPassword);
  if (!isPasswordValid) throw unauthorizedError("Invalid password!");
}

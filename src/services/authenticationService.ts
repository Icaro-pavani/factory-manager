import bcrypt from "bcrypt";
import {
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as companiesRepository from "../repositories/companiesRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

export async function signInCompany(cnpj: string, password: string) {
  const company = await getCompanyOrFail(cnpj);

  await validatePasswordOrFail(password, company.password);

  const token = tokenAPI.generateToken(company._id.toString(), "company");

  return token;
}

async function getCompanyOrFail(
  cnpj: string
): Promise<companiesRepository.Company> {
  const company = await companiesRepository.findByCnpj(cnpj);
  if (!company) throw notFoundError("No company with this CNPJ registered!");

  return company;
}

async function validatePasswordOrFail(password: string, hashPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, hashPassword);
  if (!isPasswordValid) throw unauthorizedError("Invalid password!");
}

import bcrypt from "bcrypt";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import * as companiesRepository from "../repositories/companiesRepository.js";

export async function createCompany(
  name: string,
  cnpj: string,
  password: string
) {
  const SALT = 10;
  const companyRegistered = await companiesRepository.findByCnpj(cnpj);

  if (companyRegistered) {
    throw conflictError("This cnpj has already been registered!");
  }

  const hashPassword = bcrypt.hashSync(password, SALT);
  const companyData = {
    name,
    cnpj,
    password: hashPassword,
  };
  await companiesRepository.createCompany(companyData);
}

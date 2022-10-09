import Joi from "joi";
import { Company } from "../repositories/companiesRepository.js";

export type CompanySignInParams = Omit<Company, "_id" | "name">;

export const companySignInSchema = Joi.object<CompanySignInParams>({
  cnpj: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

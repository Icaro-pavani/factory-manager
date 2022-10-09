import Joi from "joi";
import { Company } from "../repositories/companiesRepository.js";

export type CreateCompanyParams = Omit<Company, "_id">;

export const createCompanySchema = Joi.object<CreateCompanyParams>({
  name: Joi.string().required(),
  cnpj: Joi.string()
    .pattern(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/)
    .required(),
  password: Joi.string().min(6).required(),
});

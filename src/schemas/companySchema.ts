import Joi from "joi";

export interface CreateCompanyParams {
  name: string;
  cnpj: string;
  password: string;
}

export const createCompanySchema = Joi.object<CreateCompanyParams>({
  name: Joi.string().required(),
  cnpj: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

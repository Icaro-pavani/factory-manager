import Joi from "joi";
import { User } from "../repositories/usersRepository.js";

export type CreateUserParams = Omit<User, "_id" | "companyId">;

export type SignInUserParams = Omit<CreateUserParams, "name">;

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const singInUserSchema = Joi.object<SignInUserParams>({
  cpf: Joi.string().required(),
  password: Joi.string().required(),
});

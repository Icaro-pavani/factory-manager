import Joi from "joi";
import { User } from "../repositories/usersRepository.js";

export type CreateUserParams = Omit<User, "_id" | "companyId">;

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

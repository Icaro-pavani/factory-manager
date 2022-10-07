import bcrypt from "bcrypt";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
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

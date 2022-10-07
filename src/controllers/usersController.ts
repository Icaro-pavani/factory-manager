import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/validateToken.js";
import { CreateUserParams } from "../schemas/userSchemas.js";
import * as userService from "../services/userService.js";

export async function userCreation(req: AuthenticatedRequest, res: Response) {
  const companyId = req.id;
  const { name, cpf, password } = req.body as CreateUserParams;

  await userService.createUser(name, cpf, password, companyId);

  res.sendStatus(201);
}

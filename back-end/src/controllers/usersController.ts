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

export async function updateUser(req: AuthenticatedRequest, res: Response) {
  const companyId = req.id;
  const userId = req.params.id;
  const { name, cpf, password } = req.body as CreateUserParams;

  await userService.updateUser(name, cpf, password, companyId, userId);

  res.sendStatus(200);
}

export async function getUsersByCompany(
  req: AuthenticatedRequest,
  res: Response
) {
  const companyId = req.id;

  const users = await userService.getCompaniesUsers(companyId);

  res.status(200).send({ users });
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
  const companyId = req.id;
  const userId = req.params.id;

  await userService.deleteUserById(userId, companyId);

  res.sendStatus(200);
}

export async function getUserInfo(req: AuthenticatedRequest, res: Response) {
  const userId = req.id;

  const userInfo = await userService.getUserInfo(userId);

  res.status(200).send({ userInfo });
}

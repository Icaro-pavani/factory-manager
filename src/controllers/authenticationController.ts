import { Request, Response } from "express";
import { CompanySignInParams } from "../schemas/authenticationSchemas.js";
import { SignInUserParams } from "../schemas/userSchemas.js";
import * as authenticationService from "../services/authenticationService.js";

export async function signInCompany(req: Request, res: Response) {
  const { cnpj, password } = req.body as CompanySignInParams;

  const token = await authenticationService.signInCompany(cnpj, password);

  res.status(200).send({ token });
}

export async function singInUser(req: Request, res: Response) {
  const { cpf, password } = req.body as SignInUserParams;

  const token = await authenticationService.singInUser(cpf, password);

  res.status(200).send({ token });
}

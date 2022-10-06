import { Request, Response } from "express";
import { CompanySignInParams } from "../schemas/authenticationSchemas.js";
import * as authenticationService from "../services/authenticationService.js";

export async function signInCompany(req: Request, res: Response) {
  const { cnpj, password } = req.body as CompanySignInParams;

  const token = await authenticationService.signInCompany(cnpj, password);

  res.status(200).send({ token });
}

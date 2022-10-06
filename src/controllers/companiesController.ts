import { Request, Response } from "express";
import { CreateCompanyParams } from "../schemas/companySchema.js";
import * as companyService from "../services/companyService.js";

export async function companiesCreation(req: Request, res: Response) {
  const { name, cnpj, password } = req.body as CreateCompanyParams;

  await companyService.createCompany(name, cnpj, password);

  res.sendStatus(201);
}

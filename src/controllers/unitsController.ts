import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/validateToken.js";
import { CreateUnitParams } from "../schemas/unitSchemas.js";
import * as unitService from "../services/unitService.js";

export async function unitCreation(req: AuthenticatedRequest, res: Response) {
  const userId = req.id;
  const { name } = req.body as CreateUnitParams;

  await unitService.createUnit(name, userId);

  res.sendStatus(201);
}

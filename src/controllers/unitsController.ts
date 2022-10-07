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

export async function updateUnit(req: AuthenticatedRequest, res: Response) {
  const unitId = req.params.id;
  const { name } = req.body as CreateUnitParams;

  await unitService.updateUnit(name, unitId);

  res.sendStatus(200);
}

export async function getCompanyUnits(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.id;

  const units = await unitService.getAllUnits(userId);

  res.status(200).send({ units });
}

export async function deleteUnit(req: AuthenticatedRequest, res: Response) {
  const unitId = req.params.id;
  const userId = req.id;

  await unitService.deleteUnit(userId, unitId);

  res.sendStatus(200);
}

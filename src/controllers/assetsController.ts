import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/validateToken.js";
import { CreateAssetParams } from "../schemas/assetSchemas.js";
import * as assetService from "../services/assetService.js";

export async function createAsset(req: AuthenticatedRequest, res: Response) {
  const unitId = req.params.unitId;
  const userId = req.id;

  const assetInfo = req.body as CreateAssetParams;

  await assetService.createAsset(assetInfo, userId, unitId);

  res.sendStatus(201);
}

export async function getAllAssets(req: AuthenticatedRequest, res: Response) {
  const userId = req.id;

  const assets = await assetService.getAllAssets(userId);

  res.status(200).send({ assets });
}

export async function getAllUnitAssets(
  req: AuthenticatedRequest,
  res: Response
) {
  const unitId = req.params.unitId;

  const assets = await assetService.getAllUnitsAssets(unitId);

  res.status(200).send({ assets });
}

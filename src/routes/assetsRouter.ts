import { Router } from "express";
import {
  createAsset,
  getAllAssets,
  getAllUnitAssets,
} from "../controllers/assetsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { createAssetSchema } from "../schemas/assetSchemas.js";

const assetsRouter = Router();

assetsRouter
  .all("/*", validateToken)
  .post("/:unitId", validateSchema(createAssetSchema), createAsset)
  .get("/", getAllAssets)
  .get("/:unitId", getAllUnitAssets);

export default assetsRouter;

import { Router } from "express";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAllUnitAssets,
  updateAsset,
} from "../controllers/assetsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { createAssetSchema } from "../schemas/assetSchemas.js";

const assetsRouter = Router();

assetsRouter
  .all("/*", validateToken)
  .post("/:unitId", validateSchema(createAssetSchema), createAsset)
  .get("/", getAllAssets)
  .get("/:unitId", getAllUnitAssets)
  .put("/:id", validateSchema(createAssetSchema), updateAsset)
  .delete("/:id", deleteAsset);

export default assetsRouter;

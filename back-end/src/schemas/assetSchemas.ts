import Joi from "joi";
import { AssetParams } from "../repositories/assetsRepository.js";

export type CreateAssetParams = Omit<AssetParams, "companyId" | "unitId">;
export type UpdateAssetParams = CreateAssetParams & {
  unitId: string;
};

export const createAssetSchema = Joi.object<CreateAssetParams>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  model: Joi.string().required(),
  owner: Joi.string().required(),
  status: Joi.string().valid("Running", "Alerting", "Stopped"),
  healthLevel: Joi.number().integer().min(0).max(100),
});

export const updateAssetSchema = Joi.object<UpdateAssetParams>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  model: Joi.string().required(),
  owner: Joi.string().required(),
  status: Joi.string().valid("Running", "Alerting", "Stopped"),
  healthLevel: Joi.number().integer().min(0).max(100),
  unitId: Joi.string().required(),
});

import Joi from "joi";
import { UnitParams } from "../repositories/unitsRepository.js";

export type CreateUnitParams = Omit<UnitParams, "companyId">;

export const createUnitSchema = Joi.object<CreateUnitParams>({
  name: Joi.string().required(),
});

import { Router } from "express";
import {
  getCompanyUnits,
  unitCreation,
} from "../controllers/unitsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { createUnitSchema } from "../schemas/unitSchemas.js";

const unitsRouter = Router();

unitsRouter
  .all("/*", validateToken)
  .post("/", validateSchema(createUnitSchema), unitCreation)
  .get("/", getCompanyUnits);

export default unitsRouter;

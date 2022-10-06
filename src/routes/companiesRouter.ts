import { Router } from "express";
import { companiesCreation } from "../controllers/companiesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createCompanySchema } from "../schemas/companySchema.js";

const companiesRouter = Router();

companiesRouter.post(
  "/",
  validateSchema(createCompanySchema),
  companiesCreation
);

export default companiesRouter;

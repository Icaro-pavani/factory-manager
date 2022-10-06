import { Router } from "express";
import { signInCompany } from "../controllers/authenticationController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { companySignInSchema } from "../schemas/authenticationSchemas.js";

const authenticationRouter = Router();

authenticationRouter.post("/companies", validateSchema(companySignInSchema), signInCompany);

export default authenticationRouter;

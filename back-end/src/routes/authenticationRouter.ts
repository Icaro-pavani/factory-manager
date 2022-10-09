import { Router } from "express";
import {
  signInCompany,
  singInUser,
} from "../controllers/authenticationController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { companySignInSchema } from "../schemas/authenticationSchemas.js";
import { singInUserSchema } from "../schemas/userSchemas.js";

const authenticationRouter = Router();

authenticationRouter
  .post("/companies", validateSchema(companySignInSchema), signInCompany)
  .post("/users", validateSchema(singInUserSchema), singInUser);

export default authenticationRouter;

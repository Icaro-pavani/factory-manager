import { Router } from "express";
import {
  deleteUser,
  getUserInfo,
  getUsersByCompany,
  updateUser,
  userCreation,
} from "../controllers/usersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { createUserSchema } from "../schemas/userSchemas.js";

const usersRouter = Router();

usersRouter
  .all("/*", validateToken)
  .post("/", userCreation)
  .get("/", getUsersByCompany)
  .delete("/:id", deleteUser)
  .put("/:id", validateSchema(createUserSchema), updateUser)
  .get("/info-user", getUserInfo);

export default usersRouter;

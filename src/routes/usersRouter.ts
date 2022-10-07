import { Router } from "express";
import {
  getUsersByCompany,
  userCreation,
} from "../controllers/usersController.js";
import validateToken from "../middlewares/validateToken.js";

const usersRouter = Router();

usersRouter
  .all("/*", validateToken)
  .post("/", userCreation)
  .get("/", getUsersByCompany);

export default usersRouter;

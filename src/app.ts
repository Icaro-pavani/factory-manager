import express, { json, Express } from "express";
import "express-async-errors";
import cors from "cors";
import { connectDb } from "./config/database.js";
import handleErrors from "./middlewares/handleErrorsMiddleware.js";
import companiesRouter from "./routes/companiesRouter.js";
import authenticationRouter from "./routes/authenticationRouter.js";
import usersRouter from "./routes/usersRouter.js";
import unitsRouter from "./routes/unitsRouter.js";

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/companies", companiesRouter)
  .use("/auth", authenticationRouter)
  .use("/users", usersRouter)
  .use("/units", unitsRouter)
  .use(handleErrors);

export async function init(): Promise<Express> {
  try {
    await connectDb();
    return Promise.resolve(app);
  } catch (error) {
    console.log(error);
  }
}

export default app;

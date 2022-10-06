import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema<T>(
  schema: ObjectSchema<T>
): ValidationMiddleware {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      return res.status(422).send(error.message);
    }

    next();
  };
}

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

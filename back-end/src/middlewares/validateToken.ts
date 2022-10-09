import { NextFunction, Request, Response } from "express";

import * as userRepository from "../repositories/usersRepository.js";
import * as companyRepository from "../repositories/companiesRepository.js";
import tokenAPI, { JWTPayload } from "../utils/tokenAPI.js";

export default async function validateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.headers.authorization
      .replace("Bearer ", "")
      .trim();

    if (!token) {
      return res.status(422).send("Missing Token Information!");
    }

    const { id, type } = (await tokenAPI.decryptToken(token)) as JWTPayload;
    if (type === "user") {
      const user = await userRepository.findById(id);
      if (!user) {
        return res
          .status(409)
          .send("Token doesn't have information of a valid user!");
      }
    } else {
      const company = await companyRepository.findById(id);
      if (!company) {
        return res
          .status(409)
          .send("Token doesn't have information of a valid user!");
      }
    }
    req.id = id;
    req.type = type;
  } catch (error) {
    return res.status(401).send("Invalid Token Information!");
  }

  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

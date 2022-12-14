import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const secretKey = process.env.JWT_KEY;

type TypeUser = "user" | "company";

export type JWTPayload = {
  id: string;
  type: TypeUser;
};

function generateToken(id: string, type: TypeUser) {
  return jwt.sign({ id, type }, secretKey);
}

async function decryptToken(token: string) {
  return jwt.verify(token, secretKey) as JWTPayload;
}

const tokenAPI = { generateToken, decryptToken };

export default tokenAPI;

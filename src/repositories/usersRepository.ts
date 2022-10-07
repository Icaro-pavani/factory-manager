import { ObjectId } from "mongodb";
import { db } from "../config/database.js";

export async function findByCpf(cpf: string) {
  return db.collection<User>("users").findOne({ cpf });
}

export async function findById(id: string) {
  return db.collection<User>("users").findOne({ _id: new ObjectId(id) });
}

export async function createUser(userData: UserParams) {
  return db.collection("users").insertOne(userData);
}

export async function findAllByCompanyId(companyId: string) {
  return db.collection<User>("users").find({ companyId }).toArray();
}

export interface User {
  _id: ObjectId;
  name: string;
  cpf: string;
  password: string;
  companyId: string;
}

export type UserParams = Omit<User, "_id">;

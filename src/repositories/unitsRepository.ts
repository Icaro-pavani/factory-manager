import { ObjectId } from "mongodb";
import { db } from "../config/database.js";

export async function createUnit(unitData: UnitParams) {
  return db.collection("units").insertOne(unitData);
}

export async function updateUnit(unitId: string, unitData: UnitParams) {
  return db
    .collection("units")
    .updateOne({ _id: new ObjectId(unitId) }, { $set: unitData });
}

export async function remove(unitId: string) {
  return db.collection("units").deleteOne({ _id: new ObjectId(unitId) });
}

export async function findAllByCompanyId(companyId: string) {
  return db.collection<Unit>("units").find({ companyId }).toArray();
}

export async function findById(id: string) {
  return db.collection<Unit>("units").findOne({ _id: new ObjectId(id) });
}

export async function findByNameAndCompanyId(name: string, companyId: string) {
  return db.collection<Unit>("units").findOne({ name, companyId });
}

export interface Unit {
  _id: ObjectId;
  name: string;
  companyId: string;
}

export type UnitParams = Omit<Unit, "_id">;

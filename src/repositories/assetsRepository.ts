import { ObjectId } from "mongodb";
import { db } from "../config/database.js";

export async function createAsset(unitData: AssetParams) {
  return db.collection("assets").insertOne(unitData);
}

export async function updateAsset(assetId: string, assetData: AssetParams) {
  return db
    .collection("assets")
    .updateOne({ _id: new ObjectId(assetId) }, { $set: assetData });
}

export async function remove(assetId: string) {
  return db.collection("assets").deleteOne({ _id: new ObjectId(assetId) });
}

export async function findAllByCompanyId(companyId: string) {
  return db.collection<Asset>("assets").find({ companyId }).toArray();
}

export async function findAllByUnitId(unitId: string) {
  return db.collection<Asset>("assets").find({ unitId }).toArray();
}

export async function findById(id: string) {
  return db.collection<Asset>("assets").findOne({ _id: new ObjectId(id) });
}

export async function findByNameAndUnitId(name: string, unitId: string) {
  return db.collection<Asset>("assets").findOne({ name, unitId });
}

export async function removeAllByUnitId(unitId: string) {
  return db.collection("assets").deleteMany({ unitId });
}

export interface Asset {
  _id: ObjectId;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: StatusType;
  healthLevel: number;
  unitId: string;
  companyId: string;
}

export type AssetParams = Omit<Asset, "_id">;

export type StatusType = "Running" | "Alerting" | "Stopped";

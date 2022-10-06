import { db } from "../config/database.js";
import { CreateCompanyParams } from "../schemas/companySchema.js";

export async function createCompany(companyData: CreateCompanyParams) {
  return db.collection("companies").insertOne(companyData);
}

export async function findByCnpj(cnpj: string) {
  return db.collection("companies").findOne({ cnpj });
}

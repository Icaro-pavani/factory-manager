import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

interface CompanyData {
  name: string;
  cnpj: string;
  password: string;
}

type CompanySignInData = Omit<CompanyData, "name">;

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function companySignUp(signUpData: CompanyData) {
  await baseAPI.post("/companies", signUpData);
}

async function companySignIn(signInData: CompanySignInData) {
  return baseAPI.post<{ token: string }>("/auth/companies", signInData);
}

export interface User {
  _id: string;
  name: string;
  cpf: string;
  password: string;
  companyId: string;
}

async function getCompanyUsers(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ users: User[] }>("/users", config);
}

type UserData = Omit<User, "_id" | "companyId">;

async function createCompanyUser(token: string, userData: UserData) {
  const config = getConfig(token);
  await baseAPI.post("/users", userData, config);
}

async function updateCompanyUser(
  token: string,
  userData: UserData,
  userId: string
) {
  const config = getConfig(token);
  await baseAPI.put(`/users/${userId}`, userData, config);
}

async function deleteCompanyUser(token: string, userId: string) {
  const config = getConfig(token);
  await baseAPI.delete(`/users/${userId}`, config);
}

interface LoginUserData {
  cpf: string;
  password: string;
}

async function userSignIn(userData: LoginUserData) {
  return baseAPI.post<{ token: string }>("/auth/users", userData);
}

export interface UserInfo {
  userName: string;
  companyName: string;
}

async function getUserInfo(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{userInfo: UserInfo}>("/users/info-user", config);
}

export interface Unit {
  _id: string;
  name: string;
  companyId: string;
}

async function getUnits(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ units: Unit[] }>("/units", config);
}

async function deleteUnit(token: string, unitId: string) {
  const config = getConfig(token);
  await baseAPI.delete(`/units/${unitId}`, config);
}

type UnitData = Omit<Unit, "_id" | "companyId">;

async function createUnit(token: string, unitData: UnitData) {
  const config = getConfig(token);
  await baseAPI.post("/units", unitData, config);
}

async function updateUnit(token: string, unitData: UnitData, unitId: string) {
  const config = getConfig(token);
  await baseAPI.put(`/units/${unitId}`, unitData, config);
}

export interface Asset {
  _id: string;
  name: string;
  description: string;
  image: string;
  model: string;
  owner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
  companyId: string;
  unitId: string;
}

async function getAssets(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ assets: Asset[] }>("/assets", config);
}

async function deleteAssets(token: string, assetId: string) {
  const config = getConfig(token);
  await baseAPI.delete(`/assets/${assetId}`, config);
}

type AssetData = Omit<Asset, "_id" | "companyId" | "unitId">;
type UpdateAssetData = AssetData & {
  unitId: string;
};

async function createAsset(
  token: string,
  assetData: AssetData,
  unitId: string
) {
  const config = getConfig(token);
  await baseAPI.post(`/assets/${unitId}`, assetData, config);
}

async function updateAsset(
  token: string,
  assetData: UpdateAssetData,
  assetId: string
) {
  const config = getConfig(token);
  await baseAPI.put(`/assets/${assetId}`, assetData, config);
}

const api = {
  companySignUp,
  companySignIn,
  getCompanyUsers,
  createCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
  userSignIn,
  getUserInfo,
  getUnits,
  deleteUnit,
  createUnit,
  updateUnit,
  getAssets,
  deleteAssets,
  createAsset,
  updateAsset,
};

export default api;

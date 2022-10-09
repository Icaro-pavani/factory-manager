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

const api = {
  companySignUp,
  companySignIn,
  getCompanyUsers,
  createCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
  userSignIn,
};

export default api;

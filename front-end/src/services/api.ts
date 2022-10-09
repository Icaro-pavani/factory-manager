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
      Authorization: `Bearer: ${token}`,
    },
  };
}

async function companySignUp(signUpData: CompanyData) {
  await baseAPI.post("/companies", signUpData);
}

async function companySignIn(signInData: CompanySignInData) {
  return baseAPI.post<{ token: string }>("/auth/companies", signInData);
}

const api = { companySignUp, companySignIn };

export default api;

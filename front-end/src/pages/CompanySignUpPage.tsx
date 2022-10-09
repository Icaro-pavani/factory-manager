import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import api from "../services/api";
import masks from "../utils/masks";

const styles = {
  container: {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

interface FormData {
  name: string;
  cnpj: string;
  password: string;
}

export default function CompanySignUpPage() {
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cnpj: "",
    password: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleCnpjChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cnpj = masks.cnpjMask(event.target.value);
    setFormData({ ...formData, [event.target.name]: cnpj });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);

    if (!formData?.name || !formData?.cnpj || !formData?.password) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      await api.companySignUp(formData);
      setMessage({ type: "success", text: "Sign up successfully" });
      navigate("/company/sign-in");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({ type: "error", text: error.response.data });
        return;
      }
      setMessage({ type: "error", text: "Error, try again ina few seconds" });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Typography variant="h1" component="h1">
        Factory Manager
      </Typography>
      <Box sx={styles.container}>
        <Button
          sx={{ marginBottom: "30px" }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home Page
        </Button>
        <Typography sx={{ marginBottom: "20px" }} component="h2" variant="h4">
          Company Sign Up
        </Typography>
        <TextField
          name="name"
          sx={styles.input}
          label="Company Name"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
        <TextField
          name="cnpj"
          sx={styles.input}
          label="CNPJ"
          type="text"
          variant="outlined"
          onChange={handleCnpjChange}
          value={formData.cnpj}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/company/sign-in">
            <Typography>Sign in!</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </Box>
      </Box>
    </Form>
  );
}

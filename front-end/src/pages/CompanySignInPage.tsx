import {
  Box,
  Button,
  Link,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Logo from "../components/Logo";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import masks from "../utils/masks";

const styles: {
  container: SxProps;
  title: SxProps;
  input: SxProps;
  actionsContainer: SxProps;
} = {
  container: {
    marginTop: "180px",
    width: "560px",
    padding: "20px",
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
  cnpj: string;
  password: string;
}

export default function CompanySignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { setMessage } = useAlert();
  const [formData, setFormData] = useState<FormData>({
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

    if (!formData?.cnpj || !formData?.password) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      const {
        data: { token },
      } = await api.companySignIn(formData);
      signIn(token);
      navigate("/app/company");
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
      <Logo />
      <Paper sx={styles.container} elevation={6}>
        <Button
          sx={{ marginBottom: "30px" }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home Page
        </Button>
        <Typography sx={{ marginBottom: "20px" }} component="h2" variant="h4">
          Company Sign In
        </Typography>
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
          <Link component={RouterLink} to="/company/sign-up">
            <Typography>Sign up your company!</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </Box>
      </Paper>
    </Form>
  );
}

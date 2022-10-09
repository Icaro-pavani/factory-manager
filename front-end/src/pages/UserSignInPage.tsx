import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
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
  cpf: string;
  password: string;
}

export default function UserSignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { setMessage } = useAlert();
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    password: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cpf = masks.cpfMask(event.target.value);
    setFormData({ ...formData, [event.target.name]: cpf });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);

    if (!formData?.cpf || !formData?.password) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      const {
        data: { token },
      } = await api.userSignIn(formData);
      signIn(token);
      navigate("/app/user");
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
          User Sign In
        </Typography>
        <TextField
          name="cpf"
          sx={styles.input}
          label="CPF"
          type="text"
          variant="outlined"
          onChange={handleCpfChange}
          value={formData.cpf}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <Button variant="contained" type="submit">
          Enter
        </Button>
      </Box>
    </Form>
  );
}

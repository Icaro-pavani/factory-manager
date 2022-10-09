import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
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
  name: string;
  cpf: string;
  password: string;
}

export default function AddUser() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    password: "",
  });

  useEffect(() => {
    if (!token) navigate("/");
    if (!user) return;

    const { name, cpf } = user;
    setFormData((prevState) => ({ ...prevState, name, cpf }));
  }, [user, token, navigate]);

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

    if (!formData?.name || !formData?.cpf || !formData?.password) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      if (!token) {
        return navigate("/");
      }
      if (!user) {
        await api.createCompanyUser(token, formData);
      } else {
        await api.updateCompanyUser(token, formData, user._id);
      }
      setUser(null);
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
      <Box sx={styles.container}>
        <Typography sx={{ marginBottom: "20px" }} component="h2" variant="h4">
          User Registry
        </Typography>
        <TextField
          name="name"
          sx={styles.input}
          label="Name"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
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
          Add User
        </Button>
      </Box>
    </Form>
  );
}

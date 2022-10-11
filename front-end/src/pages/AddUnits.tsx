import {
  Box,
  Button,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import NavBar from "../components/NavBar";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import api from "../services/api";

const styles: {
  container: SxProps;
  input: SxProps;
} = {
  container: {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  input: { marginBottom: "16px" },
};

interface FormData {
  name: string;
}

export default function AddUnit() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { unit, setUnit } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
  });

  useEffect(() => {
    if (!token) navigate("/");
    if (!unit) return;

    const { name } = unit;
    setFormData((prevState) => ({ ...prevState, name }));
  }, [unit, token, navigate]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);

    if (!formData?.name) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      if (!token) {
        return navigate("/");
      }
      if (!unit) {
        await api.createUnit(token, formData);
      } else {
        await api.updateUnit(token, formData, unit._id);
      }
      setUnit(null);
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
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        margin: "0 auto",
        "& > :not(style)": {
          m: 1,
          width: 1000,
          height: 700,
        },
      }}
    >
      <Paper
        sx={{ backgroundColor: "background.paper", width: "100%", display: "flex" }}
        elevation={3}
      >
        <Box sx={{ marginTop: "50px", width: "250px" }}>
          <NavBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Box sx={styles.container}>
              <Typography
                sx={{ marginBottom: "20px" }}
                component="h2"
                variant="h4"
              >
                Unit Registry
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
              <Button variant="contained" type="submit">
                {!unit ? "Add Unit" : "Update Unit"}
              </Button>
            </Box>
          </Form>
        </Box>
      </Paper>
    </Box>
  );
}

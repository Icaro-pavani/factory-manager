import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";

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

export default function CompanySignUpPage() {
  const navigate = useNavigate();
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
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
        />
        <TextField
          name="cpf"
          sx={styles.input}
          label="CPF"
          type="text"
          variant="outlined"
        />
        <PasswordInput name="password" sx={styles.input} label="Password" />
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

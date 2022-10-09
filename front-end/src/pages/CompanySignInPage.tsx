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

export default function CompanySignInPage() {
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
        <TextField
          name="cnpj"
          sx={styles.input}
          label="CNPJ"
          type="text"
          variant="outlined"
        />
        <PasswordInput name="password" sx={styles.input} label="Password" />
        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/company/sign-up">
            <Typography>Sign up your company!</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </Box>
      </Box>
    </Form>
  );
}

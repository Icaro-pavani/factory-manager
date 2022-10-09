import { Box, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../hooks/useAuth";

interface Props {
  redirectPath?: string;
}

export default function AppHeader({ redirectPath = "/" }: Props) {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Typography sx={{ fontSize: "50px", fontWeight: "bold" }} variant="h1">
          Factory Manager
        </Typography>
        <LogoutIcon
          sx={{ fontSize: "50px", cursor: "pointer" }}
          onClick={handleSignOut}
        />
      </Box>
      <Outlet />
    </Box>
  );
}

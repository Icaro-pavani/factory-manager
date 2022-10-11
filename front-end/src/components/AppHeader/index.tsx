import { Box } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo";

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
          padding: "5px",
          width: "700px",
          margin: "0 auto",
        }}
      >
        <Logo />
        <LogoutIcon
          sx={{ fontSize: "50px", cursor: "pointer", color: "#ffffff" }}
          onClick={handleSignOut}
        />
      </Box>
      <Outlet />
    </Box>
  );
}

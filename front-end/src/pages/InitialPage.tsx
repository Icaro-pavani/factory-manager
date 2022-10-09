import { Box, SxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SelectionBox from "../components/SelectionBox";

const styles: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export default function InitialPage() {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        sx={{ textAlign: "center", marginBottom: "100px" }}
        variant="h1"
        component="h1"
      >
        Factory Manager
      </Typography>
      <Box sx={styles} component="div">
        <SelectionBox
          text="Company Area"
          onClick={() => navigate("/company/sign-in")}
        />
        <SelectionBox
          text="User Area"
          onClick={() => navigate("/user/sign-in")}
        />
      </Box>
    </>
  );
}

import { Paper, styled, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import SelectionBox from "../components/SelectionBox";

const styles: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  width: "70%",
  height: "500px",
  margin: "70px auto",
};

export default function InitialPage() {
  const navigate = useNavigate();

  return (
    <>
      <Logo />
      <Paper sx={styles} elevation={6}>
        <SelectionBox
          text="Access Company's Area"
          onClick={() => navigate("/company/sign-in")}
        />
        <SelectionBox
          text="Access User's Area"
          onClick={() => navigate("/user/sign-in")}
        />
      </Paper>
    </>
  );
}

const Img = styled("img")({});

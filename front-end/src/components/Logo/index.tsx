import { Box, styled } from "@mui/material";

export default function Logo() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <Img src="/logo.png" alt="logo" />
    </Box>
  );
}

const Img = styled("img")({});

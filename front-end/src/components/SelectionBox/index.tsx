import { Box, SxProps, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const styles: { box: SxProps; text: SxProps } = {
  box: {
    width: "250px",
    height: "250px",
    backgroundColor: "#0d8672",
    borderRadius: "25px",
    boxShadow: "1px 5px 5px 5px rgba(0,0,0, 0.45)",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#43c9b2",
    },
  },
  text: {
    width: "100%",
    height: "100px;",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};

export default function SelectionBox({ text, onClick }: Props) {
  return (
    <Box sx={styles.box} component="div" onClick={onClick}>
      <Typography sx={styles.text} variant="h3">
        {text}
      </Typography>
    </Box>
  );
}

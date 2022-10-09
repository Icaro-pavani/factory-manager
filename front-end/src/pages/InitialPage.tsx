import { Box } from "@mui/material";
import SelectionBox from "../components/SelectionBox";

export default function InitialPage() {
  return (
    <Box component="div">
      <SelectionBox text="Company" onClick={() => console.log("here")} />
    </Box>
  );
}

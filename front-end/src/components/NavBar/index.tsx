import {
  AddBox,
  Apartment,
  ExpandLess,
  ExpandMore,
  InsertChart,
  PrecisionManufacturing,
  Preview,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [openUnit, setOpenUnit] = useState(false);
  const [openAsset, setOpenAsset] = useState(false);

  const navigate = useNavigate();

  function handleClickUnit() {
    setOpenUnit(!openUnit);
  }

  function handleClickAsset() {
    setOpenAsset(!openAsset);
  }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 260,
        bgcolor: "background.paper",
        position: "fixed",
      }}
      component="nav"
      aria-labelledby="options-navbar"
      subheader={<ListSubheader component="div">Options List</ListSubheader>}
    >
      <ListItemButton onClick={handleClickUnit}>
        <ListItemIcon>
          <Apartment />
        </ListItemIcon>
        <ListItemText primary="Units" />
        {openUnit ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUnit} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/app/user/add-unit")}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Add Unit" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/app/user")}>
            <ListItemIcon>
              <Preview />
            </ListItemIcon>
            <ListItemText primary="Show Units" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickAsset}>
        <ListItemIcon>
          <PrecisionManufacturing />
        </ListItemIcon>
        <ListItemText primary="Assets" />
        {openAsset ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAsset} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/app/user/add-asset")}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Add Asset" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/app/user/show-assets")}
          >
            <ListItemIcon>
              <Preview />
            </ListItemIcon>
            <ListItemText primary="Show Assets" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate("/app/user/charts-all-assets")}>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary="Graphs" />
      </ListItemButton>
    </List>
  );
}

import {
  AddBox,
  Apartment,
  ExpandLess,
  ExpandMore,
  InsertChart,
  PrecisionManufacturing,
  Preview,
  QueryStats,
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
  const [openChart, setOpenChart] = useState(false);

  const navigate = useNavigate();

  function handleClickUnit() {
    setOpenUnit(!openUnit);
  }

  function handleClickAsset() {
    setOpenAsset(!openAsset);
  }

  function handleClickChart() {
    setOpenChart(!openChart);
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
      <ListItemButton onClick={handleClickChart}>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary="Graphs" />
        {openChart ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openChart} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/app/user/charts-unit")}
          >
            <ListItemIcon>
              <QueryStats />
            </ListItemIcon>
            <ListItemText primary="Condensed" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/app/user/chart-all-assets")}
          >
            <ListItemIcon>
              <QueryStats color="secondary" />
            </ListItemIcon>
            <ListItemText primary="By Unit" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

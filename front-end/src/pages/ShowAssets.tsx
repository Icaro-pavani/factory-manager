import {
  FiberManualRecord,
} from "@mui/icons-material";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import api, { Asset } from "../services/api";

export default function ShowAssets() {
  const { token } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const {
        data: { assets },
      } = await api.getAssets(token);
      setAssets(assets);
    }
    loadPage();
  }, [token, reload]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        margin: "0 auto",
        "& > :not(style)": {
          m: 1,
          width: 1000,
          height: 700,
        },
      }}
    >
      <Paper
        sx={{ backgroundColor: "#fafafa", width: "100%", display: "flex" }}
        elevation={3}
      >
        <Box sx={{ marginTop: "50px", width: "250px" }}>
          <NavBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: "50px" }}>
            Company's Assets
          </Typography>
          <Assets assets={assets} reload={reload} setReload={setReload} />
        </Box>
      </Paper>
    </Box>
  );
}

interface AssetsProps {
  assets: Asset[];
  reload: boolean;
  setReload: (reload: boolean) => void;
}

function Assets({ assets, setReload, reload }: AssetsProps) {
  const navigate = useNavigate();
  const { setAsset } = useUser();
  const { token } = useAuth();

  const colorSet = {
    Running: "#18f035",
    Alerting: "#fc1e1e",
    Stopped: "#e7e42d",
  };

  useEffect(() => {
    setAsset(null);
  }, [setAsset]);

  function handleEdit(asset: Asset) {
    setAsset(asset);
    navigate("/app/user/add-asset");
  }

  async function handleDelete(unitId: string) {
    if (window.confirm("Are you sure about deleting this unit?")) {
      if (!token) {
        return navigate("/");
      }
      await api.deleteAssets(token, unitId);
      setReload(!reload);
    }
  }

  return (
    <>
      {assets.map((asset: Asset) => (
        <Paper
          sx={{
            backgroundColor: "#5db7f3",
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
          elevation={3}
          key={asset._id}
        >
          <Img src={asset.image} alt={asset.name} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography>Name: {asset.name}</Typography>
            <Typography>Description: {asset.description}</Typography>
            <Typography>Owner: {asset.owner}</Typography>
            <Typography>Model: {asset.model}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography>Health-level: {asset.healthLevel}%</Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Status:{" "}
              <FiberManualRecord
                sx={{
                  fontSize: "15px",
                  color: `${colorSet[asset.status]}`,
                }}
              />{" "}
              {asset.status}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{ cursor: "pointer" }}
              variant="contained"
              color="secondary"
              onClick={() => handleEdit(asset)}
            >
              Edit
            </Button>
            <Button
              sx={{ cursor: "pointer" }}
              onClick={async () => await handleDelete(asset._id)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </Box>
        </Paper>
      ))}
    </>
  );
}

const Img = styled("img")({
  width: "150px",
  height: "100px",
});

import { DeleteForeverTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import api, { Unit } from "../services/api";

export default function ShowUnits() {
  const { token } = useAuth();
  const [units, setUnits] = useState<Unit[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const {
        data: { units },
      } = await api.getUnits(token);
      setUnits(units);
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
        sx={{
          backgroundColor: "background.paper",
          width: "100%",
          display: "flex",
        }}
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
            Company's Units
          </Typography>
          <Units units={units} reload={reload} setReload={setReload} />
        </Box>
      </Paper>
    </Box>
  );
}

interface UnitsProps {
  units: Unit[];
  reload: boolean;
  setReload: (reload: boolean) => void;
}

function Units({ units, setReload, reload }: UnitsProps) {
  const navigate = useNavigate();
  const { setUnit } = useUser();
  const { token } = useAuth();

  useEffect(() => {
    setUnit(null);
  }, [setUnit]);

  function handleEdit(unit: Unit) {
    setUnit(unit);
    navigate("/app/user/add-unit");
  }

  async function handleDelete(unitId: string) {
    if (window.confirm("Are you sure about deleting this unit?")) {
      if (!token) {
        return navigate("/");
      }
      await api.deleteUnit(token, unitId);
      setReload(!reload);
    }
  }

  return (
    <>
      {units.map((unit: Unit) => (
        <Paper
          key={unit._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            backgroundColor: "#a1e4ff",
            width: "300px",
            padding: "5px",
            minHeight: "50px",
          }}
        >
          <Typography>Name: {unit.name}</Typography>
          <Box sx={{ display: "flex" }}>
            <EditTwoTone
              sx={{ cursor: "pointer" }}
              onClick={() => handleEdit(unit)}
            />
            <DeleteForeverTwoTone
              sx={{ cursor: "pointer" }}
              onClick={async () => await handleDelete(unit._id)}
            />
          </Box>
        </Paper>
      ))}
    </>
  );
}

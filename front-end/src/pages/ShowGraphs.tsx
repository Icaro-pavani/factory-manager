import { Box, Paper, Typography, TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import api, { Asset, Unit } from "../services/api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ShowGraphs() {
  const { token } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [unitSelected, setUnitSelected] = useState<string>("");
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [assetsFiltered, setAssetsFiltered] = useState<Asset[]>([]);
  const [statusNumber, setStatusNumber] = useState({
    Running: 0,
    Alerting: 0,
    Stopped: 0,
  });

  const colorSet = {
    Running: "#18f035",
    Alerting: "#e7e42d",
    Stopped: "#fc1e1e",
  };

  const barOptions: Highcharts.Options = {
    title: {
      text: "Assets' Health Level",
    },
    subtitle: {
      text:
        "Colors: " +
        '<span style="color:#18f035"> Running</span>,  ' +
        '<span style="color:#e7e42d"> Alerting</span>, ' +
        '<span style="color:#fc1e1e"> Stopped</span>',
    },
    xAxis: {
      categories: assetsFiltered.map((asset) => asset.name),
      crosshair: true,
    },
    yAxis: {
      title: {
        useHTML: true,
        text: "Health Level",
        style: {
          fontSize: "16px",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Health Level",
        id: "main",
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px",
            },
          },
        ],
        type: "column",
        data: assetsFiltered.map((asset) => {
          return {
            y: asset.healthLevel,
            color: colorSet[asset.status],
          };
        }),
      },
    ],
  };

  const pieOptions: Highcharts.Options = {
    title: {
      text: "Assets' Status Distribution",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Status",
        type: "pie",
        data: Object.entries(statusNumber).map(([key, val]) => {
          return {
            name: key,
            y: (val / assetsFiltered.length) * 100,
            sliced: true,
            selected: true,
            color:
              key === "Running"
                ? "#18f035"
                : key === "Alerting"
                ? "#e7e42d"
                : "#fc1e1e",
          };
        }),
      },
    ],
  };

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const {
        data: { units },
      } = await api.getUnits(token);
      setUnits(units);

      const {
        data: { assets },
      } = await api.getAssets(token);
      setAssets(assets);
    }
    loadPage();
  }, [token, reload]);

  function handleUnitSelection(event: React.ChangeEvent<HTMLInputElement>) {
    setUnitSelected(event.target.value);
    if (event.target.value !== "all") {
      const filter = assets.filter(
        (asset) => asset.unitId === event.target.value
      );
      filter.forEach((asset) => {
        statusNumber[asset.status]++;
      });
      setAssetsFiltered([...filter]);
      setStatusNumber({ ...statusNumber });
      return;
    }
    setAssetsFiltered(assets);
  }

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
          overflowY: "scroll",
        }}
        elevation={3}
      >
        <Box sx={{ marginTop: "50px", width: "250px" }}>
          <NavBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "60px",
            marginBottom: "60px",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: "50px" }}>
            Company's Assets
          </Typography>
          <TextField
            className="input"
            name="unitId"
            sx={{ marginBottom: "16px", width: "150px" }}
            label="Select unit"
            select
            variant="outlined"
            onChange={handleUnitSelection}
            value={unitSelected}
          >
            {units.map((unit) => (
              <MenuItem key={unit._id} value={unit._id}>
                {unit.name}
              </MenuItem>
            ))}
            <MenuItem value="all">All Units</MenuItem>
          </TextField>
          <Box>
            <HighchartsReact
              highcharts={Highcharts}
              options={barOptions}
              ref={chartComponentRef}
            />
          </Box>
          <Box sx={{ height: "100%", margin: "10px 0 10px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={pieOptions}
              ref={chartComponentRef}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

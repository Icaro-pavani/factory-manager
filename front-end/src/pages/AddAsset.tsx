import { MonitorHeart } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import NavBar from "../components/NavBar";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import api, { Unit } from "../services/api";

const styles: {
  container: SxProps;
  input: SxProps;
} = {
  container: {
    marginTop: "0px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  input: { marginBottom: "16px" },
};

interface FormData {
  name: string;
  description: string;
  image: string;
  model: string;
  owner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
}

export default function AddAsset() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { asset, setAsset } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: "",
    model: "",
    owner: "",
    status: "Running",
    healthLevel: 0,
  });
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitSelected, setUnitSelected] = useState<string>("");
  const [slideValue, setSlideValue] = useState<
    number | string | Array<number | string>
  >(formData.healthLevel);

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }

    const promise = api.getUnits(token);
    promise
      .then(({ data }) => {
        setUnits(data.units);
      })
      .catch((error) => console.log(error.response.data));

    if (!asset) return;

    const {
      name,
      description,
      image,
      model,
      owner,
      status,
      healthLevel,
      unitId,
    } = asset;
    setFormData((prevState) => ({
      ...prevState,
      name,
      description,
      image,
      model,
      owner,
      status,
      healthLevel,
    }));
    setSlideValue(healthLevel);
    setUnitSelected(unitId);
  }, [asset, token, navigate]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleUnitSelection(event: React.ChangeEvent<HTMLInputElement>) {
    setUnitSelected(event.target.value);
  }

  function handleSliderInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSlideValue(Number(event.target.value));
    setFormData({ ...formData, healthLevel: Number(event.target.value) });
  }

  function handleBlur() {
    if (slideValue < 0) {
      setSlideValue(0);
    } else if (slideValue > 100) {
      setSlideValue(100);
    }
  }

  function handleSliderChange(event: Event, newValue: number | number[]) {
    setSlideValue(newValue);
    setFormData({ ...formData, healthLevel: Number(newValue) });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);

    if (
      !formData?.name ||
      !formData?.description ||
      !formData?.image ||
      !formData?.model ||
      !formData?.owner ||
      !formData?.status ||
      !formData?.healthLevel
    ) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    try {
      if (!token) {
        return navigate("/");
      }
      if (!asset) {
        await api.createAsset(token, formData, unitSelected);
      } else {
        await api.updateAsset(
          token,
          { ...formData, unitId: unitSelected },
          asset._id
        );
      }
      setAsset(null);
      navigate("/app/user/show-assets");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({ type: "error", text: error.response.data });
        return;
      }
      setMessage({ type: "error", text: "Error, try again ina few seconds" });
    }
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
          "&::-webkit-scrollbar": {
            width: 7,
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            outline: `1px solid slategrey`,
          },
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
            marginBottom: "30px",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Box sx={styles.container}>
              <Typography
                sx={{ marginBottom: "20px" }}
                component="h2"
                variant="h4"
              >
                Asset Registry
              </Typography>
              <TextField
                className="input"
                name="unitId"
                sx={styles.input}
                label="Unit"
                select
                variant="outlined"
                onChange={handleUnitSelection}
                value={unitSelected}
                required
              >
                {units.map((unit) => (
                  <MenuItem key={unit._id} value={unit._id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="name"
                sx={styles.input}
                label="Name"
                type="text"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
              />
              <TextField
                name="description"
                sx={styles.input}
                label="Description"
                type="text"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.description}
              />
              <TextField
                name="image"
                sx={styles.input}
                label="Image Link"
                type="url"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.image}
              />
              <TextField
                name="model"
                sx={styles.input}
                label="Model"
                type="text"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.model}
              />
              <TextField
                name="owner"
                sx={styles.input}
                label="Owner"
                type="text"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.owner}
              />
              <FormControl>
                <FormLabel sx={{ textAlign: "left" }}>Status</FormLabel>
                <RadioGroup
                  row
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Running"
                    control={<Radio />}
                    label="Running"
                  />
                  <FormControlLabel
                    value="Alerting"
                    control={<Radio />}
                    label="Alerting"
                  />
                  <FormControlLabel
                    value="Stopped"
                    control={<Radio />}
                    label="Stopped"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ width: 250 }}>
                <Typography
                  id="input-slider"
                  sx={{ textAlign: "left" }}
                  gutterBottom
                >
                  Health Level
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <MonitorHeart />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={typeof slideValue === "number" ? slideValue : 0}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={slideValue}
                      size="small"
                      onChange={handleSliderInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 100,
                        type: "number",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button variant="contained" type="submit">
                {!asset ? "Add Asset" : "Update Asset"}
              </Button>
            </Box>
          </Form>
        </Box>
      </Paper>
    </Box>
  );
}

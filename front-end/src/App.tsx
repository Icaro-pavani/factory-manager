import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#4781cc" },
      secondary: { main: "#424445" },
      background: { default: "#4781cc", paper: "#fafafa" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<InitialPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;

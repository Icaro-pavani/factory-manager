import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import CompanySignInPage from "./pages/CompanySignInPage";
import CompanySignUpPage from "./pages/CompanySignUpPage";
import UserSignInPage from "./pages/UserSignInPage";
import Alert from "./components/Alert";
import AppHeader from "./components/AppHeader";
import CompanyMainPage from "./pages/CompanyMainPage";
import { UserProvider } from "./contexts/UserContext";
import AddUser from "./pages/AddUser";
import ShowUnits from "./pages/ShowUnits";
import AddUnit from "./pages/AddUnits";
import ShowAssets from "./pages/ShowAssets";
import AddAsset from "./pages/AddAsset";
import ShowGraphs from "./pages/ShowGraphs";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#1c55f1" },
      secondary: { main: "#26607c" },
      background: { default: "#25616b", paper: "#f0f0f0" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route
                  path="/company/sign-in"
                  element={<CompanySignInPage />}
                />
                <Route
                  path="/company/sign-up"
                  element={<CompanySignUpPage />}
                />
                <Route path="/user/sign-in" element={<UserSignInPage />} />
                <Route path="app" element={<AppHeader />}>
                  <Route path="/app/company" element={<CompanyMainPage />} />
                  <Route path="/app/company/add-user" element={<AddUser />} />
                  <Route path="/app/user" element={<ShowUnits />} />
                  <Route path="/app/user/add-unit" element={<AddUnit />} />
                  <Route
                    path="/app/user/show-assets"
                    element={<ShowAssets />}
                  />
                  <Route path="/app/user/add-asset" element={<AddAsset />} />
                  <Route path="/app/user/charts-all-assets" element={<ShowGraphs />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Alert />
          </UserProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;

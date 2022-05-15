import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AdminView, UserView } from "./containers";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./utils/theme";
import { CssBaseline } from "@mui/material";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isAdmin } = authContext;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAdmin ? <AdminView /> : <UserView />}
      </ThemeProvider>
    </Router>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

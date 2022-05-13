import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AdminView, UserView } from "./containers";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./utils/theme";
import { CssBaseline } from "@mui/material";

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAdmin ? <AdminView /> : <UserView />}
      </ThemeProvider>
    </Router>
  );
};

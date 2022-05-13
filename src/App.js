import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AdminView, UserView } from "./containers";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./utils/theme";

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {isAdmin ? <AdminView /> : <UserView />}
      </ThemeProvider>
    </Router>
  );
};

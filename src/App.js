import { useState } from "react";
import { AdminView, UserView } from "./containers";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return <Router> {isAdmin ? <AdminView /> : <UserView />}</Router>;
};

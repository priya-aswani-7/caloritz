import { useState } from "react";
import { AdminView, UserView } from "./containers";

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return isAdmin ? <AdminView /> : <UserView />;
};

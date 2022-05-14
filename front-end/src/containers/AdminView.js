import { AdminFoodEntries, NavBar } from "../components";
import { Route, Routes } from "react-router-dom";
import { Statistics } from "../components/Statistics";

export const AdminView = () => {
  return (
    <>
      <NavBar isAdmin={true} />
      <Routes>
        <Route path="/statistics" exact element={<Statistics />}></Route>
        <Route path="/" exact element={<AdminFoodEntries />}></Route>
      </Routes>
    </>
  );
};

import { useState } from "react";
import { FoodEntryInput, GlobalFoodEntryList, NavBar } from "../components";
import { globalFoodEntriesData, usersData } from "../constants";
import { Route, Routes } from "react-router-dom";
import { Statistics } from "../components/Statistics";

export const AdminView = () => {
  const [data, setData] = useState(globalFoodEntriesData);
  const [users, setUsers] = useState(usersData);
  const [open, setOpen] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditModeIndex(null);
  };

  const handleEdit = (index) => {
    setEditModeIndex(index);
    setOpen(true);
  };

  return (
    <>
      <NavBar isAdmin={true} />
      <Routes>
        <Route path="/statistics" exact element={<Statistics />}></Route>
        <Route
          path="/"
          exact
          element={
            <>
              <FoodEntryInput
                data={data}
                setData={setData}
                isAdmin={true}
                users={users}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                editModeIndex={editModeIndex}
              />
              <GlobalFoodEntryList
                data={data}
                setData={setData}
                handleEdit={handleEdit}
              />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

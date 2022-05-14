import { useEffect, useState } from "react";
import {
  ErrorAlert,
  FoodEntryInput,
  GlobalFoodEntryList,
  LoadingSpinner,
  NavBar,
} from "../components";
import { Route, Routes } from "react-router-dom";
import { Statistics } from "../components/Statistics";
import { getFoodEntries, getUsers } from "../services/api";

export const AdminView = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFoodEntries()
      .then((data) => {
        setData(data);
        setError(error ?? null);
      })
      .catch((error) => setError(error));

    getUsers()
      .then((data) => {
        setUsers(data);
        setError(error ?? null);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    data !== null && users !== null && setLoading(false);
  }, [data, users]);

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
            error ? (
              <ErrorAlert />
            ) : (
              <>
                {loading && <LoadingSpinner />}
                <FoodEntryInput
                  data={data}
                  setData={setData}
                  isAdmin={true}
                  users={users}
                  open={open}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  editModeIndex={editModeIndex}
                  setError={setError}
                />
                <GlobalFoodEntryList
                  data={data}
                  setData={setData}
                  handleEdit={handleEdit}
                  setError={setError}
                />
              </>
            )
          }
        ></Route>
      </Routes>
    </>
  );
};

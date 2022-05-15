import { useEffect, useState } from "react";
import {
  ErrorAlert,
  FoodEntryInput,
  GlobalFoodEntryList,
  LoadingSpinner,
} from ".";
import { getFoodEntries, getUsers } from "../services/api";
import { SuccessAlert } from "./SuccessAlert";

export const AdminFoodEntries = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFoodEntries()
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => setError(error));

    getUsers()
      .then((data) => {
        setUsers(data);
        setError(null);
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

  return error ? (
    <ErrorAlert />
  ) : (
    <>
      <SuccessAlert success={success} setSuccess={setSuccess} />
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
        setLoading={setLoading}
        setSuccess={setSuccess}
      />
      <GlobalFoodEntryList
        data={data}
        setData={setData}
        handleEdit={handleEdit}
        setError={setError}
        setLoading={setLoading}
        setSuccess={setSuccess}
      />
    </>
  );
};

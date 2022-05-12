import { useState } from "react";
import { FoodEntryInput, GlobalFoodEntryList, NavBar } from "../components";
import { globalFoodEntriesData, usersData } from "../constants";

export const AdminView = () => {
  const [data, setData] = useState(globalFoodEntriesData);
  const [users, setUsers] = useState(usersData);
  const [open, setOpen] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [productName, setProductName] = useState(null);
  const [cost, setCost] = useState(null);
  const [calories, setCalories] = useState(null);
  const [consumedAt, setConsumedAt] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInEditMode(false);
  };

  const handleEdit = (index) => {
    setInEditMode(true);
    let userIndex;
    for (let i = 0; i < users?.length; i++) {
      if (users[i].id === data[index]?.userId) {
        userIndex = i;
        break;
      }
    }
    setSelectedUserIndex(userIndex);
    setProductName(data[index]?.productName);
    setCost(data[index]?.cost);
    setCalories(data[index]?.calories);
    setConsumedAt(data[index]?.consumedAt);
    setOpen(true);
  };

  return (
    <>
      <NavBar />
      <FoodEntryInput
        data={data}
        setData={setData}
        isAdmin={true}
        users={users}
        open={open}
        selectedUserIndex={selectedUserIndex}
        setSelectedUserIndex={setSelectedUserIndex}
        productName={productName}
        setProductName={setProductName}
        cost={cost}
        setCost={setCost}
        calories={calories}
        setCalories={setCalories}
        consumedAt={consumedAt}
        setConsumedAt={setConsumedAt}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        inEditMode={inEditMode}
      />
      <GlobalFoodEntryList
        data={data}
        setData={setData}
        handleEdit={handleEdit}
      />
    </>
  );
};

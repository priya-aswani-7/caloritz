import { useState } from "react";
import { FoodEntryInput, GlobalFoodEntryList, NavBar } from "../components";
import { globalFoodEntriesData, usersData } from "../constants";

export const AdminView = () => {
  const [data, setData] = useState(globalFoodEntriesData);
  const [users, setUsers] = useState(usersData);
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavBar />
      <FoodEntryInput
        data={data}
        setData={setData}
        isAdmin={true}
        users={users}
        open={open}
        handleClickOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
      />
      <GlobalFoodEntryList data={data} setData={setData} />
    </>
  );
};

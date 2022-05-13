import { useState } from "react";
import { NavBar, FoodEntryList, FoodEntryInput } from "../components";
import { foodEntriesData } from "../constants";

export const UserView = () => {
  const [data, setData] = useState(foodEntriesData);
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2100);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavBar />
      <FoodEntryInput
        data={data}
        setData={setData}
        isAdmin={false}
        open={open}
        handleClickOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
      />
      <FoodEntryList
        data={data}
        monthlyBudget={monthlyBudget}
        dailyCalorieLimit={dailyCalorieLimit}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        setFilterStartDate={setFilterStartDate}
        setFilterEndDate={setFilterEndDate}
      />
    </>
  );
};

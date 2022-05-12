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
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [productName, setProductName] = useState(null);
  const [cost, setCost] = useState(null);
  const [calories, setCalories] = useState(null);
  const [consumedAt, setConsumedAt] = useState(null);

  return (
    <>
      <NavBar />
      <FoodEntryInput
        data={data}
        setData={setData}
        isAdmin={false}
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

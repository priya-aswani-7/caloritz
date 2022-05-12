import { useState } from "react";
import { NavBar, FoodEntryList, FoodEntryInput } from "./components";
import { foodEntriesData } from "./constants";

export const App = () => {
  const [data, setData] = useState(foodEntriesData);
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2100);

  return (
    <>
      <NavBar />
      <FoodEntryInput data={data} setData={setData} />
      <FoodEntryList
        data={data}
        monthlyBudget={monthlyBudget}
        dailyCalorieLimit={dailyCalorieLimit}
      />
    </>
  );
};

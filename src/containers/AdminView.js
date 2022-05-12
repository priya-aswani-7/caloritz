import { useState } from "react";
import { FoodEntryInput, GlobalFoodEntryList, NavBar } from "../components";
import { globalFoodEntriesData } from "../constants";

export const AdminView = () => {
  const [data, setData] = useState(globalFoodEntriesData);

  return (
    <>
      <NavBar />
      <FoodEntryInput />
      <GlobalFoodEntryList data={data} />
    </>
  );
};

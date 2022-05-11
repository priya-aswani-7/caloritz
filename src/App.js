import { useState } from "react";
import { NavBar, FoodEntryList, FoodEntryInput } from "./components";
import { foodEntriesData } from "./constants";

export const App = () => {
  const [data, setData] = useState(foodEntriesData);

  return (
    <>
      <NavBar />
      <FoodEntryInput data={data} setData={setData} />
      <FoodEntryList data={data} setData={data} />
    </>
  );
};

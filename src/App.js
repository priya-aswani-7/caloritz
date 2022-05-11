import { useState } from "react";
import { NavBar, FoodEntryList, FoodEntryInput } from "./components";

export const App = () => {
  const [foodEntries, setFoodEntries] = useState([
    {
      productName: "Frozen yoghurt",
      cost: 20.12,
      calories: 159,
      consumedAt: new Date("10:02 pm, 22 April 2022"),
    },
    {
      productName: "Ice cream sandwich",
      cost: 34.09,
      calories: 237,
      consumedAt: new Date("08:02 am, 22 April 2022"),
    },
    {
      productName: "Eclair",
      cost: 45.32,
      calories: 262,
      consumedAt: new Date("05:00 pm, 21 April 2022"),
    },
    {
      productName: "Cupcake",
      cost: 22.34,
      calories: 305,
      consumedAt: new Date("11:03 pm, 20 April 2022"),
    },
    {
      productName: "Gingerbread",
      cost: 11.34,
      calories: 356,
      consumedAt: new Date("09:27 pm, 20 April 2022"),
    },
  ]);

  return (
    <>
      <NavBar />
      <FoodEntryInput
        foodEntries={foodEntries}
        setFoodEntries={setFoodEntries}
      />
      <FoodEntryList
        foodEntries={foodEntries}
        setFoodEntries={setFoodEntries}
      />
    </>
  );
};

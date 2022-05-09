import { useState } from "react";
import { NavBar, FoodEntryList, FoodEntryInput } from "./components";

export const App = () => {
  const [foodEntries, setFoodEntries] = useState([
    {
      id: 1,
      productName: "Frozen yoghurt",
      calories: 159,
      consumedAt: new Date("10:02 pm, 22 April 2022"),
    },
    {
      id: 2,
      productName: "Ice cream sandwich",
      calories: 237,
      consumedAt: new Date("08:02 am, 22 April 2022"),
    },
    {
      id: 3,
      productName: "Eclair",
      calories: 262,
      consumedAt: new Date("05:00 pm, 21 April 2022"),
    },
    {
      id: 4,
      productName: "Cupcake",
      calories: 305,
      consumedAt: new Date("11:03 pm, 20 April 2022"),
    },
    {
      id: 5,
      productName: "Gingerbread",
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
      <FoodEntryList foodEntries={foodEntries} />
    </>
  );
};

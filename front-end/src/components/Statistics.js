import { useState } from "react";
import { calorieStatisticsData, foodEntryStatisticsData } from "../constants";
import { StatisticCardSet } from "./";
import { StatisticCalorieList } from "./StatisticCalorieList";

export const Statistics = () => {
  const [foodEntryStatistics, setFoodEntryStatistics] = useState(
    foodEntryStatisticsData
  );
  const [calorieStatistics, setCalorieStatistics] = useState(
    calorieStatisticsData
  );
  return (
    <>
      <StatisticCardSet foodEntryStatistics={foodEntryStatistics} />
      <StatisticCalorieList calorieStatistics={calorieStatistics} />
    </>
  );
};

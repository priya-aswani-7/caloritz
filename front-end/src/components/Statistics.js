import { useState, useEffect } from "react";
import { calorieStatisticsData, foodEntryStatisticsData } from "../constants";
import { getStatistics } from "../services/api";
import { StatisticCardSet } from "./";
import { StatisticCalorieList } from "./StatisticCalorieList";

export const Statistics = () => {
  const [foodEntryStatistics, setFoodEntryStatistics] = useState(
    foodEntryStatisticsData
  );
  const [calorieStatistics, setCalorieStatistics] = useState(
    calorieStatisticsData
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStatistics().then((data) => {
      setError(null);
      setCalorieStatistics(data.calorieStatisticsData);
      setFoodEntryStatistics(data.foodEntryStatisticsData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <StatisticCardSet foodEntryStatistics={foodEntryStatistics} />
      <StatisticCalorieList calorieStatistics={calorieStatistics} />
    </>
  );
};

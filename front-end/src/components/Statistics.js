import { useState, useEffect } from "react";
import { calorieStatisticsData, foodEntryStatisticsData } from "../constants";
import { getStatistics } from "../services/api";
import { StatisticCardSet } from "./";
import { ErrorAlert } from "./ErrorAlert";
import { LoadingSpinner } from "./LoadingSpinner";
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
    getStatistics()
      .then((data) => {
        setError(null);
        setCalorieStatistics(data.calorieStatisticsData);
        setFoodEntryStatistics(data.foodEntryStatisticsData);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    foodEntryStatistics && calorieStatistics && setLoading(false);
  }, [foodEntryStatistics, calorieStatistics]);

  return error ? (
    <ErrorAlert />
  ) : (
    <>
      {loading && <LoadingSpinner />}
      <StatisticCardSet foodEntryStatistics={foodEntryStatistics} />
      <StatisticCalorieList calorieStatistics={calorieStatistics} />
    </>
  );
};

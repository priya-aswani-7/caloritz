import { useState, useEffect } from "react";
import { getStatistics } from "../services/api";
import { StatisticCardSet } from "./";
import { ErrorAlert } from "./ErrorAlert";
import { LoadingSpinner } from "./LoadingSpinner";
import { StatisticCalorieList } from "./StatisticCalorieList";

export const Statistics = () => {
  const [foodEntryStatistics, setFoodEntryStatistics] = useState(null);
  const [calorieStatistics, setCalorieStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStatistics()
      .then((data) => {
        setError(null);
        setFoodEntryStatistics(data.foodEntryStatisticsData);
        setCalorieStatistics(data.calorieStatisticsData);
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

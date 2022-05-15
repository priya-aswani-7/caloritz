import { useState, useEffect } from "react";
import {
  NavBar,
  FoodEntryList,
  FoodEntryInput,
  ErrorAlert,
  LoadingSpinner,
} from "../components";
import { getFoodEntriesByUserId } from "../services/api";
import { getDateFromTimestamp } from "../utils/helpers";

export const UserView = () => {
  const [userId, setUserId] = useState("627eb18aaf86485f3310d00e");
  const [data, setData] = useState(null);
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2100);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFoodEntriesByUserId(
      userId,
      filterStartDate ? getDateFromTimestamp(filterStartDate?.getTime()) : 0,
      filterEndDate
        ? getDateFromTimestamp(filterEndDate?.getTime())
        : getDateFromTimestamp(new Date())
    )
      .then((data) => {
        setError(null);
        setData(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, [filterStartDate, filterEndDate]);

  return (
    <>
      <NavBar />
      {error ? (
        <ErrorAlert />
      ) : (
        <>
          {loading && <LoadingSpinner />}
          <FoodEntryInput
            userId={userId}
            data={data}
            setData={setData}
            isAdmin={false}
            open={open}
            handleClickOpen={() => setOpen(true)}
            handleClose={() => setOpen(false)}
            editModeIndex={null}
            setError={setError}
            setLoading={setLoading}
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
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  getMonthYearString,
  getDateTimeString,
  areTimestampsInTheSameDay,
  getDateFromTimestamp,
} from "../utils/helpers";
import { Chip } from "@mui/material";

export const FoodEntry = ({
  monthlyFoodEntry,
  monthlyBudget,
  dailyCalorieLimit,
}) => {
  const [open, setOpen] = useState(false);
  const [monthlyBudgetExceeded, setMonthlyBudgetExceeded] = useState(false);
  const [daysCalorieLimitExceeded, setDaysCalorieLimitExceeded] = useState([]);
  let monthYearString = getMonthYearString(monthlyFoodEntry.monthYear);

  useEffect(() => {
    let spending = 0;
    for (let i = 0; i < monthlyFoodEntry.foodEntries.length; i++) {
      if (spending > monthlyBudget) break;
      spending += monthlyFoodEntry.foodEntries[i].cost;
    }
    setMonthlyBudgetExceeded(spending > monthlyBudget);

    let currentCalorieCount = 0;
    let currentDate = monthlyFoodEntry.foodEntries[0].consumedAt;
    let currentDaysCalorieLimitExceeded = [];
    monthlyFoodEntry.foodEntries.map((foodEntry) => {
      if (areTimestampsInTheSameDay(foodEntry.consumedAt, currentDate)) {
        currentCalorieCount += foodEntry.calories;
      } else {
        if (currentCalorieCount > dailyCalorieLimit) {
          currentDaysCalorieLimitExceeded.push(
            getDateFromTimestamp(currentDate)
          );
        }
        currentCalorieCount = foodEntry.calories;
        currentDate = foodEntry.consumedAt;
      }
    });
    if (
      currentCalorieCount > dailyCalorieLimit &&
      currentDaysCalorieLimitExceeded.indexOf(
        getDateFromTimestamp(currentDate)
      ) === -1
    ) {
      currentDaysCalorieLimitExceeded.push(getDateFromTimestamp(currentDate));
    }
    setDaysCalorieLimitExceeded(currentDaysCalorieLimitExceeded);
  }, [monthlyFoodEntry.foodEntries]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>{" "}
          {monthYearString}
        </TableCell>
        <TableCell align="right">
          {monthlyBudgetExceeded && (
            <Chip label="Monthly budget exceeded" color="secondary" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Food Entries
              </Typography>
              <Table size="small" aria-label="purchases" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Consumed At</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyFoodEntry.foodEntries.map((foodEntry, index) => {
                    let consumedAtTimeString = getDateTimeString(
                      foodEntry.consumedAt
                    );
                    let dailyCalorieLimitExceeeded =
                      daysCalorieLimitExceeded.indexOf(
                        getDateFromTimestamp(foodEntry.consumedAt)
                      ) !== -1;

                    return (
                      <TableRow key={index.toString()}>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {foodEntry.productName}
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {foodEntry.cost?.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {foodEntry.calories?.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {consumedAtTimeString}
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.secondary" }}
                          align="right"
                        >
                          {dailyCalorieLimitExceeeded && (
                            <Chip
                              label="Daily calorie limit exceeded"
                              variant="outlined"
                              color="secondary"
                              size="small"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

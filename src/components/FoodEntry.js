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
import { getMonthYearString, getDateTimeString } from "../utils/helpers";
import { Chip } from "@mui/material";

export const FoodEntry = ({ monthlyFoodEntry, monthlyBudget }) => {
  const [open, setOpen] = useState(false);
  const [monthlyBudgetExceeded, setMonthlyBudgetExceeded] = useState(false);
  let monthYearString = getMonthYearString(monthlyFoodEntry.monthYear);

  useEffect(() => {
    let spending = 0;
    for (let i = 0; i < monthlyFoodEntry.foodEntries.length; i++) {
      if (spending > monthlyBudget) break;
      spending += monthlyFoodEntry.foodEntries[i].cost;
    }
    setMonthlyBudgetExceeded(spending > monthlyBudget);
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
            <Chip label="Monthly budget exceeded" color="warning" />
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyFoodEntry.foodEntries.map((foodEntry, index) => {
                    let consumedAtTimeString = getDateTimeString(
                      foodEntry.consumedAt
                    );
                    return (
                      <TableRow key={index.toString()}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{foodEntry.productName}</TableCell>
                        <TableCell>{foodEntry.cost}</TableCell>
                        <TableCell>{foodEntry.calories}</TableCell>
                        <TableCell>{consumedAtTimeString}</TableCell>
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

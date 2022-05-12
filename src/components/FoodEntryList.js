import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FoodEntry } from "./";

export const FoodEntryList = ({ data, monthlyBudget, dailyCalorieLimit }) => {
  return (
    <TableContainer>
      <Box sx={{ maxWidth: 875, px: 5, mx: "auto" }}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Month, Year</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((monthlyFoodEntry, index) => (
              <FoodEntry
                key={index.toString()}
                monthlyFoodEntry={monthlyFoodEntry}
                monthlyBudget={monthlyBudget}
                dailyCalorieLimit={dailyCalorieLimit}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

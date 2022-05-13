import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StatisticCalorieEntry } from "./";
import { calorieStatisticsData } from "../constants";
import { Typography } from "@mui/material";

export const StatisticCalorieList = () => {
  const [calorieStatistics, setCalorieStatistics] = useState(
    calorieStatisticsData
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="overline" sx={{ fontWeight: 100, fontSize: 18 }}>
        Average calorie consumption of users for the last week
      </Typography>

      <TableContainer>
        <Box sx={{ maxWidth: 600, px: 5, mx: "auto" }}>
          <Table size="small" aria-label="purchases" sx={{ mb: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Index</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Average calories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calorieStatistics.map((statistic, index) => (
                <StatisticCalorieEntry
                  key={index.toString()}
                  index={index}
                  {...statistic}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

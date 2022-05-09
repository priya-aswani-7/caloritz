import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { FoodEntry } from "./index";
import { Paper, Typography } from "@mui/material";

export const FoodEntryList = () => {
  const [foodEntries, setFoodEntries] = useState([
    {
      id: 1,
      productName: "Frozen yoghurt",
      calories: 159,
      consumedAt: "10:02 pm, 22 April 2022",
    },
    {
      id: 2,
      productName: "Ice cream sandwich",
      calories: 237,
      consumedAt: "08:02 am, 22 April 2022",
    },
    {
      id: 3,
      productName: "Eclair",
      calories: 262,
      consumedAt: "05:00 pm, 21 April 2022",
    },
    {
      id: 4,
      productName: "Cupcake",
      calories: 305,
      consumedAt: "11:03 pm, 20 April 2022",
    },
    {
      id: 5,
      productName: "Gingerbread",
      calories: 356,
      consumedAt: "09:27 pm, 20 April 2022",
    },
  ]);

  return (
    <Paper sx={{ mx: 4, textAlign: "center", pt: 3, pb: 5 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 100 }}>
        Your current food entries :)
      </Typography>

      <TableContainer>
        <Box sx={{ maxWidth: 800, px: 5, mx: "auto" }}>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th">Index</TableCell>
                <TableCell component="th" align="center">
                  Product name
                </TableCell>
                <TableCell component="th" align="center">
                  Calories
                </TableCell>
                <TableCell component="th" align="center">
                  Consumed at
                </TableCell>
                <TableCell component="th" align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodEntries.map((foodEntry) => (
                <FoodEntry {...foodEntry} key={foodEntry.id.toString()} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Paper>
  );
};

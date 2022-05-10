import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { FoodEntry } from "./index";
import { Paper, Typography } from "@mui/material";

export const FoodEntryList = ({ foodEntries }) => {
  return (
    <Paper sx={{ mx: 4, textAlign: "center", pt: 3, pb: 5, mb: 3 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 100 }}>
        Your current food entries :)
      </Typography>

      <TableContainer>
        <Box sx={{ maxWidth: 875, px: 5, mx: "auto" }}>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th">Index</TableCell>
                <TableCell component="th" align="center">
                  Product name
                </TableCell>
                <TableCell component="th" align="center">
                  Cost
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
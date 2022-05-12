import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDateTimeString } from "../utils/helpers";

export const GlobalFoodEntryList = ({ data }) => {
  return (
    <TableContainer>
      <Box sx={{ maxWidth: 900, px: 5, mx: "auto" }}>
        <Table size="small" aria-label="purchases" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Consumed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((foodEntry, index) => {
              let consumedAtTimeString = getDateTimeString(
                foodEntry.consumedAt
              );
              return (
                <TableRow key={index.toString()}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{foodEntry.userName}</TableCell>
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
    </TableContainer>
  );
};

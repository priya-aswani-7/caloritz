import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { cloneDeep } from "lodash";
import { GlobalFoodEntry } from "./";

export const GlobalFoodEntryList = ({ data, setData }) => {
  const handleDelete = (deleteIndex) => {
    let currentData = data ? cloneDeep(data) : [];
    currentData.splice(deleteIndex, 1);
    setData(currentData);
  };

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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((foodEntry, index) => (
              <GlobalFoodEntry
                key={index.toString()}
                index={index}
                {...foodEntry}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

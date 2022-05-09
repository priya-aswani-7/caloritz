import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const FoodEntry = ({ id, productName, calories, consumedAt }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell align="center">{productName}</TableCell>
      <TableCell align="center">{calories}</TableCell>
      <TableCell align="center">{consumedAt}</TableCell>
    </TableRow>
  );
};

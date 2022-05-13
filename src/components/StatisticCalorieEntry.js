import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StatisticCalorieEntry = ({ index, userName, averageCalories }) => {
  return (
    <TableRow key={index.toString()}>
      <TableCell sx={{ color: "text.secondary" }} align="center">
        {index + 1}
      </TableCell>
      <TableCell sx={{ color: "text.secondary" }} align="center">
        {userName}
      </TableCell>
      <TableCell sx={{ color: "text.secondary" }} align="center">
        {averageCalories.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";

export const FoodEntry = ({ id, productName, calories, consumedAt }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell align="center">{productName}</TableCell>
      <TableCell align="center">{calories}</TableCell>
      <TableCell align="center">{consumedAt}</TableCell>
      <TableCell align="center">
        <IconButton component="span">
          <MoreVertIcon sx={{ color: grey[500] }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

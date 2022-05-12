import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getDateTimeString } from "../utils/helpers";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";

export const GlobalFoodEntry = ({
  userName,
  productName,
  cost,
  calories,
  consumedAt,
  index,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let consumedAtTimeString = getDateTimeString(consumedAt);
  return (
    <TableRow key={index.toString()}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{calories}</TableCell>
      <TableCell>{consumedAtTimeString}</TableCell>
      <TableCell>
        <div>
          <IconButton
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon sx={{ color: grey[500] }} />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Button variant="none" fullWidth>
              <Typography
                variant="body2"
                sx={{ py: 0.5, px: 2, textTransform: "none" }}
              >
                Edit
              </Typography>
            </Button>
            <br />
            <Button variant="none" fullWidth>
              <Typography
                variant="body2"
                sx={{ py: 0.5, px: 2, textTransform: "none" }}
              >
                Delete
              </Typography>
            </Button>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};

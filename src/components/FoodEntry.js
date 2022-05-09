import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import { Button, Popover, Typography } from "@mui/material";

export const FoodEntry = ({ id, productName, calories, consumedAt }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell align="center">{productName}</TableCell>
      <TableCell align="center">{calories}</TableCell>
      <TableCell align="center">{consumedAt}</TableCell>
      <TableCell align="right">
        <Button onClick={handleClick}>
          <MoreVertIcon sx={{ color: grey[500] }} />
        </Button>
        <Popover
          id={popOverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <Button
            variant={null}
            sx={{ textTransform: "none", display: "block", width: "100%" }}
          >
            <Typography variant="body2" sx={{ p: 0.7 }}>
              Edit
            </Typography>
          </Button>
          <Button
            variant={null}
            sx={{ textTransform: "none", display: "block", width: "100%" }}
          >
            <Typography variant="body2" sx={{ p: 0.7 }}>
              Delete
            </Typography>
          </Button>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

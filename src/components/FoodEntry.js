import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { grey } from "@mui/material/colors";
// import { Button, Popover, Typography } from "@mui/material";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

export const FoodEntry = ({
  index,
  productName,
  cost,
  calories,
  consumedAt,
  handleDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [consumedAtTimeString, setConsumedAtTimeString] = useState(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let hours = consumedAt.getHours();
    let minutes = consumedAt.getMinutes();
    let meridian = hours > 12 || (hours === 12 && minutes > 0) ? "pm" : "am";
    let dateString = consumedAt.toString().split(" ");

    let string =
      (meridian === "pm"
        ? hours < 22
          ? "0" + hours - 12
          : hours - 12
        : hours < 10
        ? "0" + hours
        : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      " " +
      meridian +
      ", " +
      dateString[2] +
      " " +
      dateString[1] +
      " " +
      dateString[3];

    setConsumedAtTimeString(string);
  }, [consumedAt]);

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell align="center">{productName}</TableCell>
      <TableCell align="center">${cost.toFixed(2)}</TableCell>
      <TableCell align="center">{calories.toFixed(2)}</TableCell>
      <TableCell align="center">{consumedAtTimeString}</TableCell>
      {/* <TableCell align="right">
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
            onClick={handleDeleteOpen}
          >
            <Typography variant="body2" sx={{ p: 0.7 }}>
              Delete
            </Typography>
          </Button>
          <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this entry?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your entry for {productName} (${cost}) having {calories}{" "}
                calories, consumed at {consumedAtTimeString} will be deleted.
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleDelete(index);
                  handleDeleteClose();
                  handleClose();
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Popover>
      </TableCell> */}
    </TableRow>
  );
};

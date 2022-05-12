import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getDateTimeString } from "../utils/helpers";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";

export const GlobalFoodEntry = ({
  index,
  userName,
  productName,
  cost,
  calories,
  consumedAt,
  handleDelete,
  handleEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let consumedAtTimeString = getDateTimeString(consumedAt);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleDelete(index);
    handleDeleteClose();
    handleClose();
  };

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
            sx={{ p: 0, m: 0 }}
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
            <Button variant="none" fullWidth onClick={() => handleEdit(index)}>
              <Typography
                variant="body2"
                sx={{ py: 0.5, px: 1, textTransform: "none" }}
              >
                Edit
              </Typography>
            </Button>
            <br />
            <Button variant="none" fullWidth onClick={handleDeleteClick}>
              <Typography
                variant="body2"
                sx={{ py: 0.5, px: 1, textTransform: "none" }}
              >
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
                  This will permanently delete the entry for {productName} ($
                  {cost}, {calories} calories), as consumed at{" "}
                  {consumedAtTimeString} by {userName}.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};

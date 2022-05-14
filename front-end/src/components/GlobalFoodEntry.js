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
    handleClose();
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleDelete(index);
    handleDeleteClose();
  };

  return (
    <TableRow key={index.toString()} sx={{ color: "text.secondary" }}>
      <TableCell sx={{ color: "text.secondary" }}>{index + 1}</TableCell>
      <TableCell sx={{ color: "text.secondary" }}>{userName}</TableCell>
      <TableCell sx={{ color: "text.secondary" }}>{productName}</TableCell>
      <TableCell sx={{ color: "text.secondary" }}>{cost.toFixed(2)}</TableCell>
      <TableCell sx={{ color: "text.secondary" }}>
        {calories.toFixed(2)}
      </TableCell>
      <TableCell sx={{ color: "text.secondary" }}>
        {consumedAtTimeString}
      </TableCell>
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
            <Button
              variant="none"
              fullWidth
              onClick={() => {
                handleClose();
                handleEdit(index);
              }}
            >
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
          </Popover>
        </div>
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
          <DialogActions sx={{ mr: 2, mb: 1 }}>
            <Button variant="outlined" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDeleteConfirm} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

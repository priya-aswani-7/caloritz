import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cloneDeep } from "lodash";

export const FoodEntryInput = ({ foodEntries, setFoodEntries }) => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [calories, setCalories] = useState("");
  const [consumedAt, setConsumedAt] = useState(null);

  const handleSave = () => {
    const currentFoodEntries = foodEntries ? cloneDeep(foodEntries) : [];
    currentFoodEntries.push({
      id: foodEntries?.length + 1 || 1,
      productName,
      cost,
      calories,
      consumedAt,
    });

    setFoodEntries(currentFoodEntries);

    setProductName("");
    setCalories("");
    setCost("");
    setConsumedAt(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new food entry
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add new food entry</DialogTitle>
        <DialogContent>
          <DialogContentText mb={1}>
            To create a new food entry, make sure to provide details of Product
            Name, Cost, Calories and Date/Time Consumed At, as indicated below.{" "}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Product Name"
                margin="none"
                variant="standard"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Cost"
                type="Number"
                margin="none"
                variant="standard"
                value={cost}
                onChange={(event) =>
                  setCost(parseFloat(event.target.value) || "")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Calories"
                type="Number"
                margin="none"
                variant="standard"
                value={calories}
                onChange={(event) =>
                  setCalories(parseFloat(event.target.value) || "")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="standard"
                      margin="none"
                      fullWidth
                      required
                    />
                  )}
                  label="Consumed At"
                  value={consumedAt}
                  onChange={(value) => setConsumedAt(value)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

import { useEffect, useState } from "react";
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

export const FoodEntryInput = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState(null);
  const [cost, setCost] = useState(null);
  const [calories, setCalories] = useState(null);
  const [consumedAt, setConsumedAt] = useState(null);
  const [datePickerOpened, setDatePickerOpened] = useState(null);

  const handleSave = () => {
    let currentData = data ? cloneDeep(data) : [];

    const month = consumedAt.getMonth();
    const year = consumedAt.getFullYear();
    const monthYear = new Date(year, month).getTime();

    let monthlyFoodEntryIndex = data ? -1 : 0;
    let currentMonthlyFoodEntry = data.filter((monthlyFoodEntry, index) => {
      if (monthlyFoodEntry.monthYear === monthYear) {
        monthlyFoodEntryIndex = index;
        return monthlyFoodEntry;
      }
    })[0];

    if (monthlyFoodEntryIndex === -1) {
      let low = 0;
      let high = data.length - 1;
      let mid;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (data[mid].monthYear < monthYear) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      monthlyFoodEntryIndex = low;

      currentData.splice(low, 0, {
        monthYear,
        foodEntries: [{ productName, cost, calories, consumedAt }],
      });
    } else {
      currentMonthlyFoodEntry.foodEntries = [
        ...currentMonthlyFoodEntry.foodEntries,
        {
          productName,
          cost,
          calories,
          consumedAt,
        },
      ];

      currentData[monthlyFoodEntryIndex] = currentMonthlyFoodEntry;
    }
    setData(currentData);

    setProductName(null);
    setCalories(null);
    setCost(null);
    setConsumedAt(null);
    setDatePickerOpened(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(consumedAt);
  }, [consumedAt]);

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
                error={productName?.trim() === ""}
                helperText={
                  productName?.trim() === "" ? "Product name is required" : null
                }
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
                error={cost === "" || (cost !== null && cost <= 0)}
                helperText={
                  cost === "" || cost === 0
                    ? "Product cost is required"
                    : cost < 0
                    ? "Product cost must be positive"
                    : null
                }
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
                error={calories === "" || (calories !== null && calories <= 0)}
                helperText={
                  calories === "" || calories === 0
                    ? "Product calories are required"
                    : calories < 0
                    ? "Product calories must be positive"
                    : null
                }
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
                      error={
                        (datePickerOpened &&
                          (consumedAt === null || consumedAt === "")) ||
                        consumedAt > new Date()
                      }
                      helperText={
                        datePickerOpened &&
                        (consumedAt === null || consumedAt === "")
                          ? "Product consumption timestamp is required"
                          : consumedAt > new Date()
                          ? "Product consumption timestamp cannot be in the future"
                          : null
                      }
                    />
                  )}
                  label="Consumed At"
                  value={consumedAt}
                  onChange={(value) => setConsumedAt(value)}
                  onClose={() => !consumedAt && setDatePickerOpened(true)}
                  maxDateTime={new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={
              !productName ||
              !cost ||
              !calories ||
              !consumedAt ||
              productName?.trim() === "" ||
              cost === "" ||
              cost <= 0 ||
              calories === "" ||
              calories <= 0 ||
              (datePickerOpened &&
                (consumedAt === null || consumedAt === "")) ||
              consumedAt > new Date()
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

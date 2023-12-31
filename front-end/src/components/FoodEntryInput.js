import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cloneDeep } from "lodash";
import { getInsertPosition } from "../utils/helpers";
import { createFoodEntry, editFoodEntry } from "../services/api";

export const FoodEntryInput = ({
  userId,
  data,
  setData,
  isAdmin,
  users,
  open,
  handleClickOpen,
  handleClose,
  editModeIndex,
  filterStartDate,
  filterEndDate,
  setError,
  setLoading,
  setSuccess,
}) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [productName, setProductName] = useState(null);
  const [cost, setCost] = useState(null);
  const [calories, setCalories] = useState(null);
  const [consumedAt, setConsumedAt] = useState(null);
  const [datePickerOpened, setDatePickerOpened] = useState(null);

  useEffect(() => {
    if (editModeIndex !== null) {
      let userIndex;
      for (let i = 0; i < users?.length; i++) {
        if (users[i]._id === data[editModeIndex]?.userId) {
          userIndex = i;
          break;
        }
      }
      setSelectedUserIndex(userIndex);
      setProductName(data[editModeIndex]?.productName);
      setCost(data[editModeIndex]?.cost);
      setCalories(data[editModeIndex]?.calories);
      setConsumedAt(new Date(data[editModeIndex]?.consumedAt));
    } else {
      handleClear();
    }
  }, [editModeIndex]);

  const handleClear = () => {
    setSelectedUserIndex(null);
    setProductName(null);
    setCalories(null);
    setCost(null);
    setConsumedAt(null);
    setDatePickerOpened(null);
    handleClose();
  };

  const handleSaveUserEntry = () => {
    handleClose();
    setLoading(true);
    createFoodEntry({
      user: userId,
      productName,
      cost,
      calories,
      consumedAt: consumedAt.getTime(),
    })
      .then((result) => {
        setError(null);
        if (
          (!filterStartDate && !filterEndDate) ||
          (consumedAt >= filterStartDate && consumedAt <= filterEndDate)
        ) {
          let currentData = data ? cloneDeep(data) : [];

          const month = consumedAt.getMonth();
          const year = consumedAt.getFullYear();
          const monthYear = new Date(year, month).getTime();

          let monthlyFoodEntryIndex = data ? -1 : 0;
          let currentMonthlyFoodEntry = data.filter(
            (monthlyFoodEntry, index) => {
              if (monthlyFoodEntry.monthYear === monthYear) {
                monthlyFoodEntryIndex = index;
                return monthlyFoodEntry;
              }
            }
          )[0];

          if (monthlyFoodEntryIndex === -1) {
            let insertPosition = getInsertPosition(
              data,
              "monthYear",
              monthYear
            );

            currentData.splice(insertPosition, 0, {
              monthYear,
              foodEntries: [
                { _id: result._id, productName, cost, calories, consumedAt },
              ],
            });
          } else {
            let insertPosition = getInsertPosition(
              currentMonthlyFoodEntry.foodEntries,
              "consumedAt",
              consumedAt.getTime()
            );

            currentMonthlyFoodEntry.foodEntries.splice(insertPosition, 0, {
              _id: result._id,
              productName,
              cost,
              calories,
              consumedAt: consumedAt.getTime(),
            });

            currentMonthlyFoodEntry.foodEntries = [
              ...currentMonthlyFoodEntry.foodEntries,
            ];

            currentData[monthlyFoodEntryIndex] = currentMonthlyFoodEntry;
          }
          setData(currentData);
        }
        handleClear();
        setSuccess("Food entry added successfully");
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  const handleSaveAdminEntry = () => {
    handleClose();
    setLoading(true);
    createFoodEntry({
      user: users[selectedUserIndex]?._id,
      productName,
      cost,
      calories,
      consumedAt: consumedAt.getTime(),
    })
      .then((result) => {
        setError(null);
        let insertPosition = getInsertPosition(
          data,
          "consumedAt",
          consumedAt.getTime()
        );

        let currentData = data ? cloneDeep(data) : [];
        currentData.splice(insertPosition, 0, {
          _id: result._id,
          userName: users[selectedUserIndex]?.name,
          userId: users[selectedUserIndex]?._id,
          productName,
          cost,
          calories,
          consumedAt: consumedAt.getTime(),
        });

        setData(currentData);
        handleClear();
        setLoading(false);
        setSuccess("Food entry added successfully");
      })
      .catch((error) => setError(error));
  };

  const handleEdit = () => {
    handleClose();
    let editItem = data[editModeIndex];

    if (
      editItem.userId === users[selectedUserIndex]?._id &&
      editItem.productName === productName &&
      editItem.cost === cost &&
      editItem.calories === calories &&
      editItem.consumedAt === consumedAt.getTime()
    ) {
      return;
    }

    setLoading(true);
    editFoodEntry(data[editModeIndex]?._id, {
      user: users[selectedUserIndex]?._id,
      productName,
      cost,
      calories,
      consumedAt: consumedAt.getTime(),
    })
      .then(() => {
        setError(null);
        let currentData = data ? cloneDeep(data) : [];
        if (consumedAt.getTime() === data[editModeIndex].consumedAt) {
          currentData[editModeIndex] = {
            userName: users[selectedUserIndex]?.name,
            userId: users[selectedUserIndex]?._id,
            productName,
            cost,
            calories,
            consumedAt: consumedAt.getTime(),
          };
        } else {
          let insertPosition = getInsertPosition(
            data,
            "consumedAt",
            consumedAt.getTime()
          );

          currentData.splice(editModeIndex, 1);
          currentData.splice(Math.max(insertPosition - 1, 0), 0, {
            userName: users[selectedUserIndex]?.name,
            userId: users[selectedUserIndex]?._id,
            productName,
            cost,
            calories,
            consumedAt: consumedAt.getTime(),
          });
        }

        setData(currentData);
        handleClear();
        setLoading(false);
        setSuccess("Food entry edited successfully");
      })
      .catch((error) => setError(error));
  };

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new food entry
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editModeIndex !== null ? "Edit food entry" : "Add new food entry"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            To {editModeIndex !== null ? "edit the" : "create a new"} food
            entry, make sure to{" "}
            {editModeIndex !== null ? "make desired changes to" : "provide"}{" "}
            details of Product Name, Cost, Calories and Date/Time Consumed At,
            as indicated below.{" "}
          </DialogContentText>
          <Grid container spacing={2}>
            {isAdmin && (
              <Grid item xs={12} sm={12}>
                <FormControl variant="standard" fullWidth required>
                  <InputLabel id="demo-simple-select-standard-label">
                    User
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedUserIndex ?? ""}
                    onChange={(event) =>
                      setSelectedUserIndex(event.target.value)
                    }
                    label="User"
                  >
                    {users?.map((user, index) => (
                      <MenuItem key={index.toString()} value={index}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Product Name"
                margin="none"
                variant="standard"
                value={productName ?? ""}
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
                value={cost ?? ""}
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
                value={calories ?? ""}
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
                        isNaN(consumedAt) ||
                        consumedAt > new Date()
                      }
                      helperText={
                        datePickerOpened &&
                        (consumedAt === null || consumedAt === "")
                          ? "Product consumption timestamp is required"
                          : isNaN(consumedAt)
                          ? "Product consumption must be a timestamp"
                          : consumedAt > new Date()
                          ? "Product consumption timestamp cannot be in the future"
                          : null
                      }
                    />
                  )}
                  label="Consumed At"
                  value={consumedAt}
                  onChange={(value) => setConsumedAt(value)}
                  onClose={() => setDatePickerOpened(true)}
                  maxDateTime={new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={
              isAdmin
                ? editModeIndex !== null
                  ? handleEdit
                  : handleSaveAdminEntry
                : handleSaveUserEntry
            }
            disabled={
              (isAdmin && selectedUserIndex === null) ||
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
              isNaN(consumedAt) ||
              consumedAt > new Date()
            }
          >
            {editModeIndex !== null ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

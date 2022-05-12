import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const Filter = ({
  filterStartDate,
  filterEndDate,
  setFilterStartDate,
  setFilterEndDate,
}) => {
  const [startDate, setStartDate] = useState(filterStartDate);
  const [endDate, setEndDate] = useState(filterEndDate);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplyFilter = () => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    handleClose();
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterStartDate(null);
    setFilterEndDate(null);
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            To apply date filters to displayed food entries, select Start and
            End Dates below.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="standard"
                      margin="none"
                      fullWidth
                      required
                    />
                  )}
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  maxDate={endDate < new Date() ? endDate : new Date()}
                  label="Start Date"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="standard"
                      margin="none"
                      fullWidth
                      required
                    />
                  )}
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  label="End Date"
                  minDate={startDate}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilter}>Clear Filter</Button>
          <Button onClick={handleApplyFilter}>Apply Filter</Button>
        </DialogActions>
      </Dialog>{" "}
    </>
  );
};

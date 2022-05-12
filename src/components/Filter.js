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
import { Chip, Grid } from "@mui/material";
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
      {filterStartDate && filterEndDate && (
        <Chip
          onDelete={handleClearFilter}
          label={`${filterStartDate.toDateString().slice(4)} - ${filterEndDate
            .toDateString()
            .slice(4)}`}
          color="primary"
        />
      )}
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
                      error={
                        startDate > new Date() ||
                        (endDate && startDate > endDate)
                      }
                      helperText={
                        startDate > new Date()
                          ? "Start Date cannot be in the future"
                          : endDate && startDate > endDate
                          ? "Start Date cannot be greater than End Date"
                          : null
                      }
                    />
                  )}
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  maxDate={
                    !endDate
                      ? new Date()
                      : endDate < new Date()
                      ? endDate
                      : new Date()
                  }
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
                      error={
                        endDate > new Date() ||
                        (startDate && endDate && endDate < startDate)
                      }
                      helperText={
                        endDate > new Date()
                          ? "End Date cannot be in the future"
                          : startDate && endDate && endDate < startDate
                          ? "End Date cannot be smaller than Start Date"
                          : null
                      }
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
          <Button
            onClick={handleApplyFilter}
            disabled={
              !startDate ||
              !endDate ||
              startDate > new Date() ||
              (endDate && startDate > endDate) ||
              endDate > new Date() ||
              (startDate && endDate && endDate < startDate)
            }
          >
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>{" "}
    </>
  );
};

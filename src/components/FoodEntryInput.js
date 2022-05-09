import { useEffect, useState } from "react";
import { Button, Fab, Paper, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Grid from "@mui/material/Grid";

export const FoodEntryInput = () => {
  const [displayForm, setDisplayForm] = useState(null);
  const [productName, setProductName] = useState("");
  const [calories, setCalories] = useState("");
  const [consumedAt, setConsumedAt] = useState(null);

  const handleClear = () => {
    setProductName("");
    setCalories("");
    setConsumedAt(null);
  };

  useEffect(() => {
    console.log("pn changed:", productName);
  }, [productName]);

  useEffect(() => {
    console.log("calories changed:", calories);
  }, [calories]);

  useEffect(() => {
    console.log("consumedAt changed:", consumedAt);
  }, [consumedAt]);

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Fab
          color={displayForm ? "error" : "warning"}
          aria-label="add"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? <ClearIcon /> : <AddIcon />}
        </Fab>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 100, mt: 1 }}
          gutterBottom
          component="div"
        >
          {displayForm
            ? "No thanks, I'll add a food entry later"
            : "Create a new food entry"}
        </Typography>
      </Box>
      {displayForm && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            sx={{
              maxWidth: 800,
              mx: 4,
              p: 3,
            }}
          >
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Calories"
                  type="Number"
                  value={calories}
                  onChange={(event) => setCalories(event.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} fullWidth required />
                    )}
                    label="Consumed At"
                    value={consumedAt}
                    onChange={(value) => setConsumedAt(value)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                size="large"
                startIcon={<ClearIcon />}
                onClick={() => handleClear()}
              >
                Clear
              </Button>
              <Button variant="contained" size="large" endIcon={<SendIcon />}>
                Save
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

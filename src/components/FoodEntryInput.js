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
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 100, mt: 1 }}
          gutterBottom
          component="div"
        >
          Create a new food entry
        </Typography>
      </Box>
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
              <TextField label="Product Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Calories"
                type="Number"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  label="Consumed At"
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
            >
              Clear
            </Button>
            <Button variant="contained" size="large" endIcon={<SendIcon />}>
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

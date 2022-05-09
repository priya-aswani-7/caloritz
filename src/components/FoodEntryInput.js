import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

export const FoodEntryInput = () => {
  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
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
  );
};

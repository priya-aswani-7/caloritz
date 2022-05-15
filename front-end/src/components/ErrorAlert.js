import { Alert } from "@mui/material";
import { Box } from "@mui/system";

export const ErrorAlert = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Alert severity="error">
        Something went wrong! Refresh the browser and try again.
      </Alert>
    </Box>
  );
};

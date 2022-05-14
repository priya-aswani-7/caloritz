import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
};

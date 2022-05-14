import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100vh",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.6,
        zIndex: 10,
      }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
};

import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export const SuccessAlert = ({ success, setSuccess }) => {
  return (
    <Box sx={{ mx: 3 }}>
      <Collapse in={success ? true : false}>
        <Alert
          color="primary"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      </Collapse>
    </Box>
  );
};

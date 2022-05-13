import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export const NavBar = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={3}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to={"/"}
              sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
            >
              Caloritz.
            </Typography>
            {props.isAdmin && (
              <Box>
                <Button
                  color="inherit"
                  sx={{ mr: 2 }}
                  component={Link}
                  to={"/"}
                >
                  Food Entries
                </Button>
                <Button color="inherit" component={Link} to={"/statistics"}>
                  Statistics
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Box>
  );
};

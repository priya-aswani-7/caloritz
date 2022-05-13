import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StatisticCard } from "./";
import { getDateMonthYearString } from "../utils/helpers";
import { statisticsData } from "../constants";

export const Statistics = () => {
  const nowString = getDateMonthYearString(new Date().getTime());
  return (
    <Box sx={{ mx: 5, textAlign: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: 100, mb: 2 }}>
        Today: {nowString}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {statisticsData?.map((statistic, index) => (
          <StatisticCard key={index.toString()} {...statistic} />
        ))}
      </Box>
    </Box>
  );
};

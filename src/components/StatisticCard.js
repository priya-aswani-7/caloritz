import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getDateMonthYearString } from "../utils/helpers";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const StatisticCard = ({
  foodEntryCount,
  timePhrase,
  startDate,
  endDate,
}) => {
  let durationString = `${getDateMonthYearString(
    startDate
  )} - ${getDateMonthYearString(endDate)}`;

  return (
    <Card sx={{ maxWidth: 275, mx: 2 }}>
      <CardContent>
        <Typography variant="h3" component="div">
          {foodEntryCount}
        </Typography>
        <Typography sx={{ mb: 3 }}>Food Entries</Typography>
        <Typography variant="h5" component="div">
          {timePhrase.split(" ").map((word, index) => {
            return (
              <span key={index.toString()}>
                {word}
                {bull}
              </span>
            );
          })}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 14 }}
          color="text.secondary"
        >
          {durationString}
        </Typography>
      </CardContent>
    </Card>
  );
};

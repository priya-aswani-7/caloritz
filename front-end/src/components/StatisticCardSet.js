import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StatisticCard } from ".";
import { getDateMonthYearString } from "../utils/helpers";

export const StatisticCardSet = ({ foodEntryStatistics }) => {
  const nowString = getDateMonthYearString(new Date().getTime());

  return (
    <Box sx={{ mx: 5, textAlign: "center", mb: 4 }}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 100, fontSize: 18 }}
        color="primary"
      >
        Food entry counts of the last week vs the last fortnight
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 100, mb: 2 }}>
        Today: {nowString}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {foodEntryStatistics?.map((statistic, index) => (
          <StatisticCard key={index.toString()} {...statistic} />
        ))}
      </Box>
    </Box>
  );
};

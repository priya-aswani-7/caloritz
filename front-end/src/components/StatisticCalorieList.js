import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StatisticCalorieEntry } from "./";
import { Typography } from "@mui/material";

export const StatisticCalorieList = ({ calorieStatistics }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 100, fontSize: 18 }}
        color="primary"
      >
        Average calorie consumption of users for the last week
      </Typography>

      {calorieStatistics?.length > 0 ? (
        <TableContainer>
          <Box sx={{ maxWidth: 600, px: 5, mx: "auto" }}>
            <Table size="small" aria-label="purchases" sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Index</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Average calories</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calorieStatistics?.map((statistic, index) => (
                  <StatisticCalorieEntry
                    key={index.toString()}
                    index={index}
                    {...statistic}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      ) : (
        calorieStatistics?.length === 0 && (
          <Typography
            sx={{ textAlign: "center", fontWeight: 100 }}
            color="text.secondary"
          >
            There are no current users to show average consumption for. Create
            one or more users first :)
          </Typography>
        )
      )}
    </Box>
  );
};

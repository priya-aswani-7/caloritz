import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FoodEntry, Filter } from "./";

export const FoodEntryList = ({
  data,
  monthlyBudget,
  dailyCalorieLimit,
  filterStartDate,
  filterEndDate,
  setFilterStartDate,
  setFilterEndDate,
}) => {
  return data?.length > 0 ? (
    <TableContainer>
      <Box sx={{ maxWidth: 875, px: 5, mx: "auto" }}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Month, Year</TableCell>
              <TableCell align="right">
                <Filter
                  filterStartDate={filterStartDate}
                  filterEndDate={filterEndDate}
                  setFilterStartDate={setFilterStartDate}
                  setFilterEndDate={setFilterEndDate}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((monthlyFoodEntry, index) => (
              <FoodEntry
                key={index.toString()}
                monthlyFoodEntry={monthlyFoodEntry}
                monthlyBudget={monthlyBudget}
                dailyCalorieLimit={dailyCalorieLimit}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  ) : (
    (data === undefined || data?.length === 0) && (
      <Typography
        sx={{ textAlign: "center", fontWeight: 100 }}
        color="text.secondary"
      >
        There are no current food entries. Tap above to create one :)
      </Typography>
    )
  );
};

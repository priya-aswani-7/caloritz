import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { cloneDeep } from "lodash";
import { deleteFoodEntry } from "../services/api";
import { GlobalFoodEntry } from "./";

export const GlobalFoodEntryList = ({
  data,
  setData,
  handleEdit,
  setError,
  setLoading,
}) => {
  const handleDelete = (deleteIndex) => {
    setLoading(true);
    deleteFoodEntry(data[deleteIndex]?._id)
      .then(() => {
        setError(null);
        let currentData = data ? cloneDeep(data) : [];
        currentData.splice(deleteIndex, 1);
        setData(currentData);
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  return data?.length > 0 ? (
    <TableContainer>
      <Box sx={{ maxWidth: 925, px: 5, mx: "auto" }}>
        <Table size="small" aria-label="purchases" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Cost ($)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Consumed At</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((foodEntry, index) => (
              <GlobalFoodEntry
                key={index.toString()}
                index={index}
                {...foodEntry}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  ) : (
    data?.length === 0 && (
      <Typography
        sx={{ textAlign: "center", fontWeight: 100 }}
        color="text.secondary"
      >
        There are no current food entries. Tap above to create one :)
      </Typography>
    )
  );
};

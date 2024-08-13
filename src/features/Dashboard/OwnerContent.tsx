import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardCard from "../../components/Card/DashboardCard";

import { Upload } from "@mui/icons-material";
import RevenueChart from "./RevenueChart";
import { useEffect, useState } from "react";
import AddBookForm from "../Book/AddBookForm";
import { fetchOwnerRents } from "../Rent/rentAction";
import { fetchOwnerBooks } from "../Book/bookActions";
import { useAppDispacth, useAppSelector } from "../../app/hooks";

export default function OwnerContent() {
  const [open, setOpen] = useState(false);
  function handleOpenAddModal() {
    console.log({ open });

    setOpen(true);
  }
  const dispatch = useAppDispacth();
  useEffect(() => {
    dispatch(fetchOwnerRents());
    dispatch(fetchOwnerBooks());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { user } = useAppSelector((state) => state.users);
  const { ownerBooks } = useAppSelector((state) => state.books);
  const { ownerRents } = useAppSelector((state) => state.rents);
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Filter rents where createdAt is today
  const filteredRents = ownerRents.filter((rent) => {
    // Convert createdAt to Date object and format to YYYY-MM-DD
    const rentDate = new Date(rent.createdAt);
    const rentDateString = rentDate.toISOString().split("T")[0];
    return rentDateString === todayString;
  });
  return (
    <Box p={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box flexGrow={1} mr={2}></Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Upload />}
          onClick={handleOpenAddModal}
        >
          Upload Books
        </Button>
      </Box>

      <Grid container spacing={5} my={6}>
        <Grid item md={4} xs={12}>
          <DashboardCard title="Books" count={ownerBooks?.length || 0} />
        </Grid>

        <Grid item md={4} xs={12}>
          <DashboardCard title="Rents" count={ownerRents?.length || 0} />
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard title="Revenue" count={user?.walletBalance || 0} />
        </Grid>
      </Grid>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom my={3}>
          Today's Rent
        </Typography>
        <TableContainer component={Paper} sx={{ my: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRents?.length > 0 ? (
                filteredRents.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.bookCopy?.book?.book_title}</TableCell>
                    <TableCell>
                      {row.renter?.firstName} {row.renter?.lastName}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Revenue
        </Typography>

        <RevenueChart />
      </Box>
      <AddBookForm open={open} setOpen={setOpen} />
    </Box>
  );
}

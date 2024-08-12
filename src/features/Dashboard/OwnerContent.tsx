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
import { useState } from "react";
import AddBookForm from "../Book/AddBookForm";

// Sample data for the table
const todayRentData = [
  { bookName: "Book A", customerName: "John Doe", quantity: 3 },
  { bookName: "Book B", customerName: "Jane Smith", quantity: 2 },
  { bookName: "Book C", customerName: "Alice Johnson", quantity: 1 },
];

export default function OwnerContent() {
  const [open, setOpen] = useState(false);
  function handleOpenAddModal() {
    console.log({ open });

    setOpen(true);
  }

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
        <Grid item md={6} xs={12}>
          <DashboardCard title="Books" count={56} />
        </Grid>

        <Grid item md={6} xs={12}>
          <DashboardCard title="Rents" count={56} />
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
              {todayRentData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.bookName}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Revenue Chart Placeholder */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Revenue
        </Typography>
        {/* <Paper
          sx={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Chart Placeholder</Typography>
        </Paper> */}
        <RevenueChart />
      </Box>
      <AddBookForm open={open} setOpen={setOpen} />
    </Box>
  );
}

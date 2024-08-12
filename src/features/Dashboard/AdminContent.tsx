import { Box, Grid } from "@mui/material";
import DashboardCard from "../../components/Card/DashboardCard";
import BookRequests from "../Book/BookRequests";
import OwnerRequests from "../Owner/OwnerRequests";

export default function AdminContent() {
  return (
    <Box p={8}>
      <Grid container spacing={5}>
        <Grid item md={3}>
          <DashboardCard title="Owners" count={56} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Books" count={56} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Users" count={56} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Rents" count={56} />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6}> */}
      <OwnerRequests />
      <Box my={3}>
        {" "}
        <BookRequests />
      </Box>
    </Box>
  );
}

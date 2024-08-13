import { Box, Grid } from "@mui/material";
import DashboardCard from "../../components/Card/DashboardCard";
import BookRequests from "../Book/BookRequests";
import OwnerRequests from "../Owner/OwnerRequests";
import { useEffect } from "react";
import { fetchBooks } from "../Book/bookActions";
import { fetchOwners, fetchCustomers } from "../User/userActions";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchRents } from "../Rent/rentAction";

export default function AdminContent() {
  const dispatch = useAppDispacth();
  useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchBooks());
    dispatch(fetchCustomers());
    dispatch(fetchRents());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { owners, customers } = useAppSelector((state) => state.users);
  const { books } = useAppSelector((state) => state.books);
  const { rents } = useAppSelector((state) => state.rents);
  return (
    <Box p={8}>
      <Grid container spacing={5} width={"90%"}>
        <Grid item md={3}>
          <DashboardCard title="Owners" count={owners?.length || 0} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Books" count={books?.length || 0} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Customers" count={customers?.length || 0} />
        </Grid>
        <Grid item md={3}>
          <DashboardCard title="Rents" count={rents?.length || 0} />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6}> */}
      <OwnerRequests />
      <Box my={3} width={"90%"}>
        {" "}
        <BookRequests />
      </Box>
    </Box>
  );
}

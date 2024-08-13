import { Box, Grid, Typography } from "@mui/material";
import NavBar from "../../components/Navigation/NavBar";
import CustomCard from "../../components/Card/CustomCard";
import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { getApprovedBooks } from "../Book/bookActions";
import { fetchUser } from "../Auth/authActions";
import CustomText from "../../components/Typography/CustomText";

export default function HomePage() {
  const dispatch = useAppDispacth();
  const { approvedBooks } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getApprovedBooks());
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      {user?.userType == "customer" && user?.requestStatus == "pending" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 6, mb: 4 }}
        >
          {" "}
          <CustomText
            text="Your approval to be owner is pending"
            fontSize={18}
            fontWeight={400}
            color="#555"
          ></CustomText>
        </Box>
      ) : (
        <></>
      )}
      <Box mx={4} maxWidth="100%" mt={3}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 3, mb: 4 }}
        >
          <CustomText
            text="Books Available For Rent"
            fontSize={30}
            fontWeight={500}
            mb={4}
            mt={6}
          ></CustomText>
        </Box>
        <Grid container spacing={2} width="100%" pl={5} pr={4}>
          {approvedBooks.length > 0 ? (
            approvedBooks.map((book) => (
              <Grid item lg={2} xs={12} sm={6} key={book.id}>
                <CustomCard data={book} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textSecondary">
                No books available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

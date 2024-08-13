import { Box, Grid } from "@mui/material";
import NavBar from "../../components/Navigation/NavBar";
import CustomCard from "../../components/Card/CustomCard";
import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { getApprovedBooks } from "../Book/bookActions";
import { fetchUser } from "../Auth/authActions";
import { Book } from "../../types/bookTypes";
import CustomText from "../../components/Typography/CustomText";

export default function HomePage() {
  const dispatch = useAppDispacth();
  const { approvedBooks } = useAppSelector((state) => state.books);
  useEffect(() => {
    dispatch(getApprovedBooks());
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <Box mx={4} maxWidth="100%" mt={8}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 6, mb: 4 }}
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
          {approvedBooks?.map((book: Book) => (
            <Grid item lg={2} xs={12} sm={6} key={book.id}>
              <CustomCard data={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

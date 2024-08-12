import { Box, Grid } from "@mui/material";
import NavBar from "../../components/Navigation/NavBar";
import CustomCard from "../../components/Card/CustomCard";
import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { getApprovedBooks } from "../Book/bookActions";
import { fetchUser } from "../User/userActions";
import { Book } from "../../types/bookTypes";

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
        <Grid container spacing={2} width="100%" pl={5} pr={4}>
          {/* Each Grid item will take up 2 columns on large screens */}
          {approvedBooks?.map((book: Book) => (
            <Grid item lg={2} xs={12} sm={6}>
              <CustomCard data={book} key={book.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

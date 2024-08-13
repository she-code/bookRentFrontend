import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import CustomCard from "../../components/Card/CustomCard";
import NavBar from "../../components/Navigation/NavBar";
import { Book } from "../../types/bookTypes";
import { getApprovedBooks } from "../Book/bookActions";
import { fetchUser } from "../Auth/authActions";
import { useParams } from "react-router-dom";

export default function CategoryFilteredPage() {
  const dispatch = useAppDispacth();
  const { approvedBooks } = useAppSelector((state) => state.books);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const { id } = useParams<{ id: string }>();
  console.log({ id });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getApprovedBooks());
        await dispatch(fetchUser());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingBooks) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const filteredBooks = approvedBooks?.filter(
    (book) => book.categoryId == Number(id)
  );

  return (
    <>
      <NavBar />
      <Box mx={4} maxWidth="100%" mt={8}>
        <Grid container spacing={2} width="100%" pl={5} pr={4}>
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book: Book) => (
              <Grid item lg={2} xs={12} sm={6} key={book.id}>
                <CustomCard data={book} />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "50vh",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No Data Found
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
}

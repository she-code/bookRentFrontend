import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
} from "@mui/material";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBook } from "./bookActions";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "./bookSlice";
import CustomButton from "../../components/Button/CustomButton";

export default function BookDetailsPage() {
  const dispatch = useAppDispacth();
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const { book, loading } = useAppSelector((state) => state.books);
  const navigate = useNavigate();
  const [bookNotFound, setBookNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        await dispatch(fetchBook(bookId));
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchBookData();
  }, [dispatch, bookId]);

  useEffect(() => {
    if (!loading && !book) {
      setBookNotFound(true);
    }
  }, [loading, book]);

  if (loading) {
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
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (bookNotFound) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >
        <Typography variant="h4" color="text.secondary">
          No Book Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "white",
            p: 4,
            mb: 4,
          }}
        >
          {/* Book Image */}
          <Grid
            item
            md={6}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                height="400"
                image={book?.image || "/default-image.png"}
                alt={book?.book_title || "Book Image"}
              />
            </Card>
          </Grid>

          {/* Book Details */}
          <Grid item md={6} xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {book?.book_title || "Book Title"}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Author: {book?.author || "Unknown"}
                </Typography>
                <Typography variant="body1" paragraph>
                  {book?.description || "No description available."}
                </Typography>
                <Typography variant="body1">
                  <strong>Available Quantity:</strong> {book?.quantity || 0}
                </Typography>
                <Typography variant="body1">
                  <strong>Rent Amount:</strong> $
                  {book?.rent_amount?.toFixed(2) || "0.00"}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  <strong>Added by:</strong> {book?.User?.firstName || "N/A"}{" "}
                  {book?.User?.lastName || "N/A"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Category:</strong>{" "}
                  {book?.Category?.category_name || "N/A"}
                </Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <CustomButton
                    variant="contained"
                    bgColor="primary"
                    text="Rent This Book"
                    handleClick={() => navigate(`/bookRent/${book?.id}`)}
                  />
                  <IconButton color="primary">
                    <i className="fas fa-heart"></i>{" "}
                    {/* Add appropriate icon or component */}
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

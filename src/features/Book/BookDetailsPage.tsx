import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBook } from "./bookActions";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "./bookSlice";
import CustomButton from "../../components/Button/CustomButton";
import NavBar from "../../components/Navigation/NavBar";

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

  const bookImage =
    book?.copies && book.copies.length > 0
      ? book.copies[0]?.image
      : book?.image;

  // Calculate the total available quantity
  const totalQuantity = book?.copies?.reduce(
    (sum, copy) => sum + copy.quantity,
    0
  );

  // Calculate the price range
  const rentalPrices = book?.copies?.map((copy) => copy.rentalPrice) || [];
  const minPrice = Math.min(...(rentalPrices as number[]));
  const maxPrice = Math.max(...(rentalPrices as number[]));
  const priceRange =
    minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  return (
    <>
      <NavBar />
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
                  image={bookImage}
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
                    <strong>Available Quantity:</strong> {totalQuantity || 0}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Rent Amount:</strong> {priceRange}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Category :</strong> {book?.Category?.category_name}
                  </Typography>
                  {/* List of Copies */}
                  {book?.copies && book.copies.length > 0 && (
                    <Box mt={4}>
                      <Typography variant="h6" gutterBottom>
                        Available Copies
                      </Typography>
                      <List>
                        {book.copies.map((copy) => (
                          <ListItem key={copy.id}>
                            <ListItemText
                              primary={`Price: $${copy.rentalPrice} | Condition: ${copy.condition}`}
                              secondary={`Location: ${
                                copy.owner?.location || "N/A"
                              } | Owner: ${copy.owner?.firstName || "N/A"} ${
                                copy.owner?.lastName || "N/A"
                              }`}
                            />
                            <CustomButton
                              variant="contained"
                              bgColor="primary"
                              text="Rent This Copy"
                              handleClick={() =>
                                navigate(
                                  `/bookRent/${book?.id}?copyId=${copy.id}`
                                )
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

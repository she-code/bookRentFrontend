import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBookCopy } from "./bookActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addRent } from "../Rent/rentAction";
import NavBar from "../../components/Navigation/NavBar";
import { addRentSuccess } from "../Rent/rentSlice";
import defaultImage from "../../assets/default-image.jpg";
export default function CheckoutPage() {
  // Initial state for quantity
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispacth();
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const copyId = queryParams.get("copyId");
  const { bookCopy } = useAppSelector((state) => state.books);
  const bookCopyId = Number(copyId);
  useEffect(() => {
    dispatch(fetchBookCopy(bookCopyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bookCopyId]);

  // Handle quantity change
  const increaseQuantity = () => {
    if (bookCopy && quantity < bookCopy.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Calculate total amount
  const totalAmount = bookCopy
    ? ((bookCopy?.rentalPrice as number) * quantity).toFixed(2)
    : "0.00";

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Dispatch the addRent action
      const response = await dispatch(
        addRent({
          bookCopyId: bookCopyId,
          bookId: bookId,
          ownerId: bookCopy?.ownerId as number,
          quantity: quantity,
          totalAmount: Number(totalAmount),
        })
      ).unwrap();

      // Check the response for success or failure
      if (response?.statusCode === 200) {
        // Display success message
        dispatch(addRentSuccess(response.data));

        alert("Rent added successfully!");
        navigate("/");
      } else {
        // Display error message
        alert(response?.error || "An error occurred while adding the rent.");
      }
    } catch (error) {
      // Handle any errors that occurred during dispatch
      alert("An unexpected error occurred: " + (error as Error).message);
    }
  };

  // Get query parameters

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
        }}
      >
        <Container maxWidth="lg">
          {bookCopy ? (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: "white",
                  p: 2,
                  mb: 4,
                }}
              >
                {/* Book Image and Title */}
                <Grid
                  item
                  md={4}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={bookCopy?.image || defaultImage} // Default image if not available
                      alt={bookCopy?.book?.book_title || "Book Image"}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {bookCopy?.book?.book_title || "Book Title"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Price: $${
                          bookCopy?.rentalPrice?.toFixed(2) || "0.00"
                        }`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Checkout Details */}
                <Grid item md={8} xs={12}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Checkout Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Available Quantity: {bookCopy?.quantity || 0}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Category:{" "}
                      {bookCopy?.book?.Category?.category_name || "No category"}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={2}
                    >
                      <IconButton
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="h6">{quantity}</Typography>
                      <IconButton
                        onClick={increaseQuantity}
                        disabled={
                          bookCopy?.quantity === undefined ||
                          quantity >= bookCopy.quantity
                        }
                      >
                        <Add />
                      </IconButton>
                    </Stack>

                    <Typography variant="h6" gutterBottom>
                      Amount: ${totalAmount}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handlePayment}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography>No Book Found</Typography>
          )}
        </Container>
      </Box>
    </>
  );
}

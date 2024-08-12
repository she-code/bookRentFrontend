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
import { fetchBook } from "./bookActions";
import { useParams } from "react-router-dom";

export default function CheckoutPage() {
  // Initial state for quantity
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispacth();
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const { book } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBook(bookId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bookId]);

  // Handle quantity change
  const increaseQuantity = () => {
    if (book && quantity < book.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Calculate total amount
  const totalAmount = book ? (8 * quantity).toFixed(2) : "0.00";

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
      <Container maxWidth="lg">
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
                image={book?.image || "/default-image.png"} // Default image if not available
                alt={book?.book_title || "Book Image"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book?.book_title || "Book Title"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* {`Price: $${book?.amount?.toFixed(2) || "0.00"}`} */} 7
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
                Available Quantity: {book?.quantity || 0}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <IconButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Remove />
                </IconButton>
                <Typography variant="h6">{quantity}</Typography>
                <IconButton
                  onClick={increaseQuantity}
                  disabled={
                    book?.quantity === undefined || quantity >= book.quantity
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
              >
                Pay Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

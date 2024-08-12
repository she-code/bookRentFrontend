/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect } from "react";
import CustomButton from "../../components/Button/CustomButton";
import CustomTextField from "../../components/TextField/Custom_TextField";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { Dialog, DialogContent } from "@mui/material";
import CustomSelect from "../../components/DropDown/CustomSelect";
import { fetchCategories } from "../Category/categoryActions";
import { fetchBook, updateBook } from "./bookActions";
import {
  setLoading,
  updateBookAvailability,
  updateBookQuantity,
  updateBookSuccess,
  updateRentAmount,
} from "./bookSlice";

export default function EditBookForm(props: {
  open: boolean;
  setOpen: (val: boolean) => void;
  bookId: number;
}) {
  const { open, setOpen, bookId } = props;
  const dispatch = useAppDispacth();

  // Function to handle closing the popup
  const handleClose = () => {
    setOpen(false);
  };

  const mapBookAvailability = (availability: string): string => {
    switch (availability) {
      case "available":
        return "available";
      case "not_available":
        return "not_available";
      default:
        return "not_available";
    }
  };
  const { categories } = useAppSelector((state) => state.categories);
  const { book } = useAppSelector((state) => state.books);
  const currentAvailability = mapBookAvailability(
    book?.bookAvailability as string
  );
  const currentCategory = book?.Category?.id as number;

  const availabilityOptions = [
    { label: "Available", value: "available" },
    { label: "Not Available", value: "not_available" },
  ];
  const categoryOptions = categories.map((category) => ({
    label: category.category_name,
    value: category.id as number,
  }));
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    // Dispatch the updateBook thunk
    const resultAction = await dispatch(
      updateBook({
        id: book?.id as number,
        rent_amount: book?.rent_amount as number,
        quantity: book?.quantity as number,
        bookAvailability: book?.bookAvailability as string,
      })
    );

    // Check if the thunk was fulfilled
    if (updateBook.fulfilled.match(resultAction)) {
      const response = resultAction.payload;
      if (response.statusCode === 200) {
        dispatch(updateBookSuccess(response.data));
        setOpen(false);
      } else {
        console.error("Failed to update book:", response.message);
      }
    } else {
      // Handle errors or rejected cases
      console.error("Failed to update book:", resultAction.payload);
    }
  }

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
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle>Confirm Action</DialogTitle> */}
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            placeholder=""
            label="Title"
            type="text"
            disabled={true}
            //   error={!!errors.book_title}
            //   helperText={errors.book_title}
            name={"book_title"}
            value={book?.book_title as string}
            handleInputChangeCB={() => {}}
          />
          <CustomTextField
            placeholder=""
            label="Author"
            type="text"
            disabled={true}
            //   error={!!errors.author}
            //   helperText={errors.author as string}
            name={"author"}
            value={book?.author as string}
            handleInputChangeCB={() => {}}
          />
          <CustomTextField
            placeholder=""
            label="Quantity"
            type="number"
            //   error={!!errors.quantity}
            //   helperText={errors.quantity as string}
            name={"quantity"}
            value={book?.quantity.toString() as string}
            handleInputChangeCB={(e) => {
              dispatch(updateBookQuantity(Number(e.target.value)));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Rent Amount"
            type="number"
            //   error={!!errors.rent_amount}
            //   helperText={errors.rent_amount as string}
            name={"rent_amount"}
            value={book?.rent_amount?.toString() as string}
            handleInputChangeCB={(e) => {
              dispatch(updateRentAmount(Number(e.target.value)));
            }}
          />

          <CustomSelect<number>
            label="Category"
            name="category"
            disabled={true}
            options={categoryOptions}
            value={currentCategory}
            onChange={() => {}}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />

          <CustomSelect<string>
            label="Availability"
            name="availability"
            options={availabilityOptions}
            value={currentAvailability}
            onChange={(e) => dispatch(updateBookAvailability(e.target.value))}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />
          <CustomButton
            text="Update"
            variant="contained"
            mt={4}
            bgColor="#00ABFF"
          />
        </form>{" "}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            // Add your approval action here
            handleClose(); // Close the popup after action
          }}
          color="primary"
          variant="contained"
        >
          Approve
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";

import CustomButton from "../../components/Button/CustomButton";
import CustomTextField from "../../components/TextField/Custom_TextField";

import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CustomSelect from "../../components/DropDown/CustomSelect";
import { fetchCategories } from "../Category/categoryActions";
import {
  addBookSuccess,
  clearBookFields,
  requestFailure,
  requestStart,
  setAuthor,
  setBookAvailability,
  setBookTitle,
  setCategoryId,
  setCondition,
  setDescription,
  setQuantity,
  setRentAmount,
} from "./bookSlice";
import FileUploadContainer from "../../components/TextField/FileUploadContainer";
import { registerBook } from "./bookActions";
import CustomText from "../../components/Typography/CustomText";

export default function AddBookForm(props: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { open, setOpen } = props;
  const dispatch = useAppDispacth();

  // Function to handle closing the popup
  const handleClose = () => {
    setOpen(false);
  };

  const { categories } = useAppSelector((state) => state.categories);
  const {
    book_title,
    author,
    quantity,
    availability,
    rentalPrice,
    condition,
    categoryId,
    description,
    error,
    loading,
  } = useAppSelector((state) => state.books);

  const availabilityOptions = [
    { label: "Available", value: "available" },
    { label: "Not Available", value: "not_available" },
  ];
  const categoryOptions = categories.map((category) => ({
    label: category.category_name,
    value: category.id as number,
  }));
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFiles, setSelectedFiles] = useState<{
    image?: File;
    pdf?: File;
  }>({});

  const onFileSelect = (file: File | null, type: "image" | "pdf") => {
    setSelectedFiles((prev) => ({
      ...prev,
      [type]: file || undefined,
    }));
  };

  const schema = z.object({
    book_title: z.string().min(1, "Book title is required"),
    author: z.string().min(1, "Book Author is required"),
    availability: z.string().min(1, "Book Availability is required"),
    description: z.string().min(1, "Description is required"),
    condition: z.string().min(1, "Condition is required"),

    categoryId: z.number().min(1, "category is required"),

    quantity: z.number().min(1, "quantity must be number"),
    rentalPrice: z.number().min(1, "rental Price must be number"),
  });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const result = schema.safeParse({
      book_title,
      author,
      quantity,
      availability,
      rentalPrice,
      categoryId,
      description,
      condition,
      //   selectedFiles,
    });
    if (result.success) {
      console.log(
        book_title,
        author,
        quantity,
        availability,
        rentalPrice,
        categoryId
      );
      dispatch(requestStart());
      const response = await dispatch(
        registerBook({
          book_title,
          author,
          quantity,
          availability: availability as string,
          rentalPrice,
          description,
          condition,
          categoryId: categoryId as number,
          image: selectedFiles.image as File,
          file: selectedFiles.pdf as File,
        })
      );
      if ("error" in response.payload) {
        console.error("Error:", response.payload.error);
        dispatch(requestFailure(response.payload.error));
        setOpen(true);
      } else {
        // Handle the success case
        console.log("Success:", response.payload);
        dispatch(addBookSuccess(response.payload));
        dispatch(clearBookFields());
        setOpen(false);
      }
    } else {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          fieldErrors[path] = issue.message;
        }
      });
      console.log({ fieldErrors });
      setErrors(fieldErrors);
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle my={3} textAlign={"center"}>
        Add Book
      </DialogTitle>
      <DialogContent>
        {error ? (
          <CustomText
            text={error as string}
            fontSize={18}
            color="red"
            fontWeight={200}
          />
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit}>
          <CustomTextField
            placeholder=""
            label="Title"
            type="text"
            error={!!errors.book_title}
            helperText={errors.book_title}
            name={"book_title"}
            value={book_title as string}
            handleInputChangeCB={(e) => {
              dispatch(setBookTitle(e.target.value));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Author"
            type="text"
            error={!!errors.author}
            helperText={errors.author as string}
            name={"author"}
            value={author as string}
            handleInputChangeCB={(e) => {
              dispatch(setAuthor(e.target.value));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Description"
            type="text"
            error={!!errors.description}
            helperText={errors.description}
            name={"description"}
            value={description as string}
            handleInputChangeCB={(e) => {
              dispatch(setDescription(e.target.value));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Condition"
            type="text"
            error={!!errors.condition}
            helperText={errors.condition}
            name={"condition"}
            value={condition as string}
            handleInputChangeCB={(e) => {
              dispatch(setCondition(e.target.value));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Quantity"
            type="number"
            error={!!errors.quantity}
            helperText={errors.quantity as string}
            name={"quantity"}
            value={quantity.toString() as string}
            handleInputChangeCB={(e) => {
              dispatch(setQuantity(Number(e.target.value)));
            }}
          />
          <CustomTextField
            placeholder=""
            label="Rent Amount"
            type="number"
            error={!!errors.rentalPrice}
            helperText={errors.rentalPrice as string}
            name={"rentalPrice"}
            value={rentalPrice?.toString() as string}
            handleInputChangeCB={(e) => {
              dispatch(setRentAmount(Number(e.target.value)));
            }}
          />

          <CustomSelect<number>
            label="Category"
            name="categoryId"
            options={categoryOptions}
            value={categoryId as number}
            onChange={(e) => {
              dispatch(setCategoryId(Number(e.target.value)));
            }}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            error={!!errors.categoryId}
            helperText={errors.categoryId as string}
          />

          <CustomSelect<string>
            label="Availability"
            name="availability"
            options={availabilityOptions}
            value={availability as string}
            onChange={(e) => dispatch(setBookAvailability(e.target.value))}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            error={!!errors.availability}
            helperText={errors.availability as string}
          />
          <FileUploadContainer
            onFileSelect={(file) => onFileSelect(file, "image")}
            type="image"
          />
          <FileUploadContainer
            onFileSelect={(file) => onFileSelect(file, "pdf")}
            type="pdf"
          />

          <CustomButton
            text={loading ? "Please wait.." : "Add"}
            variant="contained"
            mt={4}
            bgColor="#00ABFF"
          />
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}

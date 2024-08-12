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
  requestFailure,
  requestStart,
  setAuthor,
  setBookAvailability,
  setBookTitle,
  setCategoryId,
  setQuantity,
  setRentAmount,
} from "./bookSlice";
import FileUploadContainer from "../../components/TextField/FileUploadContainer";
import { registerBook } from "./bookActions";

export default function UploadBookForm(props: {
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
    bookAvailability,
    rent_amount,
    categoryId,
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
    bookAvailability: z.string().min(1, "Book Availability is required"),
    categoryId: z.number().min(1, "category is required"),

    quantity: z.number().min(1, "quantity must be number"),
    rent_amount: z.number().min(1, "rent_amount must be number"),

    // selectedFiles: z.object({
    //   image: z
    //     .instanceof(File)
    //     .refine((file) => file.type.startsWith("image/"), {
    //       message: "Invalid image file type. Only images are allowed.",
    //     }),
    //   pdf: z
    //     .instanceof(File)
    //     .refine((file) => file.type === "application/pdf", {
    //       message: "Invalid PDF file type. Only PDFs are allowed.",
    //     }),
    // }),
  });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const result = schema.safeParse({
      book_title,
      author,
      quantity,
      bookAvailability,
      rent_amount,
      categoryId,
      //   selectedFiles,
    });
    if (result.success) {
      console.log(
        book_title,
        author,
        quantity,
        bookAvailability,
        rent_amount,
        categoryId
      );
      dispatch(requestStart());
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
            error={!!errors.rent_amount}
            helperText={errors.rent_amount as string}
            name={"rent_amount"}
            value={rent_amount?.toString() as string}
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
            name="bookAvailability"
            options={availabilityOptions}
            value={bookAvailability as string}
            onChange={(e) => dispatch(setBookAvailability(e.target.value))}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            error={!!errors.bookAvailability}
            helperText={errors.bookAvailability as string}
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
            text="Add"
            variant="contained"
            mt={4}
            bgColor="#00ABFF"
          />
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useState } from "react";
import { BookCopy } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { deleteBook, fetchBooks, fetchOwnerBooks } from "./bookActions";
import { Box, capitalize, ThemeProvider } from "@mui/material";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import CustomButton from "../../components/Button/CustomButton";

import { theme } from "../../utils";

const BooksPage = () => {
  const dispatch = useAppDispacth();
  const { books, ownerBooks } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user?.userType == "admin") {
      dispatch(fetchBooks());
    } else {
      dispatch(fetchOwnerBooks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookData = user?.userType === "owner" ? ownerBooks ?? [] : books ?? [];

  const [open, setOpen] = useState(false);
  const [bookId, setBookID] = useState(0);
  // Function to handle the button click
  const handleEdit = (id: number) => {
    setBookID(id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your approval logic here
    console.log(`Approved item with ID: ${id}`);
    dispatch(deleteBook(id));
  };

  const columns: MRT_ColumnDef<BookCopy>[] = [
    {
      accessorKey: "book",
      header: "Book Name",
      size: 100,
      Cell: ({ cell }) =>
        capitalize(
          (cell.getValue<BookCopy["book"]>()?.book_title as string) || ""
        ),
    },
    {
      accessorKey: "book",
      header: "Author",
      size: 100,
      Cell: ({ cell }) =>
        capitalize((cell.getValue<BookCopy["book"]>()?.author as string) || ""),
    },

    {
      accessorKey: "owner",
      header: "Owner",
      size: 150,
      Cell: ({ cell }) =>
        `${capitalize(
          (cell.getValue<BookCopy["owner"]>()?.firstName as string) || ""
        )} ${capitalize(
          (cell.getValue<BookCopy["owner"]>()?.lastName as string) || ""
        )}`,
    },
    {
      accessorKey: "book",
      header: "Category",
      size: 150,
      Cell: ({ cell }) =>
        cell.getValue<BookCopy["book"]>()?.Category?.category_name,
    },

    {
      accessorKey: "approved",
      header: "Approved",
      size: 100,
      enableSorting: true,
    },
    ...(user?.userType !== "admin"
      ? [
          {
            accessorKey: "actions",
            header: "Actions",
            size: 150,
            Cell: ({ row }) => (
              <Box display={"flex"} gap={2}>
                {" "}
                <CustomButton
                  mr={2}
                  text="Edit"
                  variant="contained"
                  bgColor="green"
                  textColor="white"
                  handleClick={() => handleEdit(row?.original?.id as number)}
                />
                <CustomButton
                  mr={2}
                  text="Delete"
                  variant="contained"
                  bgColor="red"
                  textColor="white"
                  handleClick={() => handleDelete(row?.original?.id as number)}
                />
              </Box>
            ),
            enableColumnFilter: false,
            enableSorting: false,
          },
        ]
      : []),
  ];

  const table = useMaterialReactTable<BookCopy>({
    columns,
    data: bookData,
    initialState: { showColumnFilters: false },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box py={8} pl={4}>
        <Box width={"95%"} mt={4}>
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default BooksPage;

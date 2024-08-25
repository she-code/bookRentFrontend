import { Box, createTheme, IconButton, ThemeProvider } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { BookCopy } from "../../types/bookTypes";
import { deleteBook, fetchBooks, fetchOwnerBooks } from "../Book/bookActions";
import { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { Create, Delete } from "@mui/icons-material";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
          borderRadius: "8px",
          padding: "16px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          border: "none",
          fontWeight: 300,
          fontSize: "14px",
          color: "#656575",
        },
      },
    },
  },
});

export default function LiveBookStatus() {
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

  const [open, setOpen] = useState(false);
  const [bookId, setBookID] = useState(0);
  const handleEdit = (id: number) => {
    setBookID(id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your approval logic here
    console.log(`Approved item with ID: ${id}`);
    dispatch(deleteBook(id));
  };
  const bookData = user?.userType === "owner" ? ownerBooks ?? [] : books ?? [];

  const columns: MRT_ColumnDef<BookCopy>[] = [
    {
      accessorKey: "No",
      header: "No",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.book_title,
    },
    {
      accessorKey: "book",
      header: "Book No",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.id,
    },
    {
      accessorKey: "book",
      header: "Book Name",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.book_title,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      Cell: ({ cell }) => cell.getValue() as string,
    },
    {
      accessorKey: "rentalPrice",
      header: "Price",
      size: 100,
      Cell: ({ cell }) => (cell.getValue() as string) + " birr",

      enableColumnFilter: false,
    },

    {
      accessorKey: "actions",
      header: "Actions",
      size: 150,
      Cell: ({ row }) => (
        <Box display={"flex"} gap={2}>
          {" "}
          <IconButton onClick={() => handleEdit(row?.original?.id as number)}>
            <Create />
          </IconButton>
          <IconButton onClick={() => handleDelete(row?.original?.id as number)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
      enableColumnFilter: false,
      enableSorting: false,
    },
  ];

  const table = useMaterialReactTable<BookCopy>({
    columns,
    data: bookData,
    initialState: {
      showColumnFilters: false,
      pagination: { pageSize: 5 },
    },
    enablePagination: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box width={"80%"} ml={3} height={"90%"}>
        {" "}
        <MaterialReactTable table={table} />
      </Box>
    </ThemeProvider>
  );
}

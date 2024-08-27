import { useEffect, useState } from "react";
import { BookCopy } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import {
  deleteBook,
  fetchBooks,
  fetchOwnerBooks,
  updateBookStatusThunk,
} from "./bookActions";
import {
  Box,
  capitalize,
  FormControlLabel,
  IconButton,
  Switch,
  ThemeProvider,
} from "@mui/material";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

import { getColor, theme } from "../../utils";
import CustomNavHeading from "../../components/Navigation/CustomNavHeading";
import EditBookForm from "./EditBookForm";
import { Create, Delete } from "@mui/icons-material";

const BooksPage = () => {
  const dispatch = useAppDispacth();
  const { books, ownerBooks } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    // Determine if data needs to be fetched based on userType
    if (user?.userType === "admin" && shouldFetch) {
      dispatch(fetchBooks());
      setShouldFetch(false); // Prevent further fetching until necessary
    } else if (user?.userType === "owner" && shouldFetch) {
      dispatch(fetchOwnerBooks());
      setShouldFetch(false); // Prevent further fetching until necessary
    }
  }, [dispatch, user?.userType, shouldFetch]);

  useEffect(() => {
    // Trigger refetch when books or ownerBooks change
    if (user?.userType === "admin" && books && books.length === 0) {
      setShouldFetch(true);
    } else if (
      user?.userType === "owner" &&
      ownerBooks &&
      ownerBooks.length === 0
    ) {
      setShouldFetch(true);
    }
  }, [books, ownerBooks, user?.userType]);

  const bookData = user?.userType === "owner" ? ownerBooks ?? [] : books ?? [];

  const [open, setOpen] = useState(false);
  const [bookId, setBookID] = useState(0);
  // Function to handle the button click
  const handleEdit = (id: number) => {
    setBookID(id);
    setOpen(true);
  };
  function handleChange(id: number | undefined, approved: boolean): void {
    if (id !== undefined) {
      // Dispatch action based on the current state
      dispatch(
        updateBookStatusThunk({ id, status: approved ? "reject" : "approve" })
      );
    }
  }
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

    ...(user?.userType === "admin"
      ? [
          {
            accessorKey: "owner",
            header: "Owner",
            size: 150,
            Cell: ({ cell }) => {
              const owner = cell.getValue() as BookCopy["owner"];
              return `${capitalize(owner?.firstName || "")} ${capitalize(
                owner?.lastName || ""
              )}`;
            },
            enableColumnFilter: false,
            enableSorting: false,
          },
        ]
      : [
          {
            accessorKey: "quantity",
            header: "Quantity",
            size: 100,
            Cell: ({ cell }) => cell.getValue(),
          },
          {
            accessorKey: "condition",
            header: "Condition",
            size: 100,
            Cell: ({ cell }) => capitalize(cell.getValue()),
          },
        ]),
    {
      accessorKey: "book",
      header: "Category",
      size: 150,
      Cell: ({ cell }) =>
        cell.getValue<BookCopy["book"]>()?.Category?.category_name,
    },

    {
      accessorKey: "approved",
      header: "Status",
      size: 100,
      enableSorting: true,
      Cell: ({ row }) => (
        <FormControlLabel
          sx={{
            backgroundColor: "rgba(0, 128, 0, 0.1)",
            borderRadius: 5,
            px: 2,
            color: getColor(row.original.approved as boolean),
          }}
          control={
            <Switch
              checked={row.original.approved === true}
              onChange={() =>
                handleChange(row.original.id, row.original.approved as boolean)
              }
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "green",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "green",
                },
                "& .MuiSwitch-track": {
                  borderRadius: 20,
                  width: 150,
                },
                "& .MuiSwitch-thumb": {
                  width: 20,
                  height: 20,
                },
              }}
            />
          }
          label={capitalize(
            row.original.approved ? "Approved" : ("Rejected" as string)
          )}
          labelPlacement="start"
        />
      ),
    },
    ...(user?.userType !== "admin"
      ? [
          {
            accessorKey: "actions",
            header: "Actions",
            size: 150,
            Cell: ({ row }) => (
              <Box display={"flex"} gap={2}>
                <IconButton
                  onClick={() => handleEdit(row?.original?.id as number)}
                >
                  <Create sx={{ color: "green" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(row?.original?.id as number)}
                >
                  <Delete sx={{ color: "red" }} />
                </IconButton>
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
      <Box pl={4}>
        <CustomNavHeading
          title={user?.userType == "admin" ? "Admin" : "Owner"}
          sub={"Books"}
        />
        <Box mt={4}>
          <MaterialReactTable table={table} />
        </Box>
        <EditBookForm open={open} setOpen={setOpen} bookId={bookId} />
      </Box>
    </ThemeProvider>
  );
};
export default BooksPage;

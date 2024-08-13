import { useEffect, useState } from "react";
import { BookCopy } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { deleteBook, fetchBooks, fetchOwnerBooks } from "./bookActions";
import { Box } from "@mui/material";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import CustomButton from "../../components/Button/CustomButton";
import LayoutWithDrawer from "../../components/Layout/LayoutWithDrawer";
import EditBookForm from "./EditBookForm";

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
      header: "Title",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.book_title,
    },
    {
      accessorKey: "book",
      header: "Author",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.author,
    },
    {
      accessorKey: "createdAt",
      header: "Uploaded At",
      size: 100,
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue() as string);
        return date.toLocaleDateString();
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      size: 150,
      Cell: ({ cell }) =>
        `${cell.getValue<BookCopy["owner"]>()?.firstName} ${
          cell.getValue<BookCopy["owner"]>()?.lastName
        }`,
    },
    {
      accessorKey: "book",
      header: "Category",
      size: 150,
      Cell: ({ cell }) =>
        cell.getValue<BookCopy["book"]>()?.Category?.category_name,
    },
    {
      accessorKey: "owner",
      header: "Location",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["owner"]>()?.location,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 100,

      enableColumnFilter: false,
      enableSorting: true,
    },

    {
      accessorKey: "availability",
      header: "Availability",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      accessorKey: "rentalPrice",
      header: "Rent Price",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
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
    initialState: { showColumnFilters: true },
  });

  return (
    <LayoutWithDrawer title="Books">
      <Box py={8} pl={4}>
        <Box width={"95%"} mt={4}>
          <MaterialReactTable table={table} />
        </Box>
        <EditBookForm open={open} setOpen={setOpen} bookId={bookId} />
      </Box>
    </LayoutWithDrawer>
  );
};
export default BooksPage;

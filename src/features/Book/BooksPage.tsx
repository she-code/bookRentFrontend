import { useEffect, useState } from "react";
import { Book } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBooks, fetchOwnerBooks } from "./bookActions";
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
  const { user } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (user?.userType == "admin") {
      dispatch(fetchBooks());
    } else {
      dispatch(fetchOwnerBooks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookData = user?.userType == "owner" ? ownerBooks : books;
  const [open, setOpen] = useState(false);
  const [bookId, setBookID] = useState(0);
  // Function to handle the button click
  const handleApprove = (id: number) => {
    // Implement your approval logic here
    console.log(`Approved item with ID: ${id}`);
    // Open the popup
    setBookID(id);
    setOpen(true);
  };

  const columns: MRT_ColumnDef<Book>[] = [
    {
      accessorKey: "book_title",
      header: "Title",
      size: 100,
    },
    {
      accessorKey: "author",
      header: "Author",
      size: 100,
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
      accessorKey: "User",
      header: "Owner",
      size: 150,
      Cell: ({ cell }) =>
        `${cell.getValue<Book["User"]>()?.firstName} ${
          cell.getValue<Book["User"]>()?.lastName
        }`,
    },
    {
      accessorKey: "Category",
      header: "Category",
      size: 150,
      Cell: ({ cell }) => cell.getValue<Book["Category"]>()?.category_name,
    },
    {
      accessorKey: "User",
      header: "Location",
      size: 100,
      Cell: ({ cell }) => cell.getValue<Book["User"]>()?.location,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
    },

    {
      accessorKey: "bookAvailability",
      header: "Availability",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      accessorKey: "rent_amount",
      header: "Rent Amount",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
    },

    {
      accessorKey: "actions",
      header: "Actions",
      size: 150,
      Cell: ({ row }) => (
        <CustomButton
          mr={2}
          text="Edit"
          variant="contained"
          bgColor="green"
          textColor="white"
          handleClick={() => handleApprove(row?.original?.id as number)}
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
    },
  ];

  const table = useMaterialReactTable<Book>({
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

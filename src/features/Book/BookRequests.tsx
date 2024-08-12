import { useEffect } from "react";
import { Book } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBookRequests, updateBookStatusThunk } from "./bookActions";
import { Box } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import CustomButton from "../../components/Button/CustomButton";

const BookRequests = () => {
  const dispatch = useAppDispacth();
  const { requestedBooks } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookData = requestedBooks;

  function handleApprove(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateBookStatusThunk({ id, status: "approved" }));
    }
  }

  function handleReject(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateBookStatusThunk({ id, status: "rejected" }));
    }
  }
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
      accessorKey: "status",
      header: "Status",
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
        <Box display="flex" justifyContent="space-between">
          <CustomButton
            mr={2}
            text="Approve"
            variant="contained"
            bgColor="green"
            textColor="white"
            handleClick={() => handleApprove(row.original.id)}
          />
          <CustomButton
            text="Reject"
            variant="contained"
            bgColor="red"
            textColor="white"
            handleClick={() => handleReject(row.original.id)}
          />
        </Box>
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
    <Box width={"95%"} mt={4}>
      <MaterialReactTable table={table} />
    </Box>
  );
};
export default BookRequests;

import { useEffect } from "react";
import { BookCopy } from "../../types/bookTypes";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchBookRequests, updateBookStatusThunk } from "./bookActions";
import { Box } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import CustomButton from "../../components/Button/CustomButton";
import CustomText from "../../components/Typography/CustomText";

const BookRequests = () => {
  const dispatch = useAppDispacth();
  const { requestedBooks } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookData = requestedBooks?.length > 0 ? requestedBooks : [];

  function handleApprove(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateBookStatusThunk({ id, status: "approve" }));
    }
  }

  function handleReject(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateBookStatusThunk({ id, status: "reject" }));
    }
  }

  const columns: MRT_ColumnDef<BookCopy>[] = [
    {
      accessorKey: "id",
      header: "Copy Id",
      size: 100,
      enableColumnFilter: false,
    },
    {
      accessorKey: "book",
      header: "Title",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue<BookCopy["book"]>()?.book_title}`,
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
      accessorKey: "availability",
      header: "Availability",
      size: 100,
      enableColumnFilter: true,
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
      header: "Author",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue<BookCopy["book"]>()?.author}`,
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
      accessorKey: "condition",
      header: "Condition",
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
      accessorKey: "actions",
      header: "Actions",
      size: 150,
      enableColumnFilter: false,
      enableSorting: false,
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
    },
  ];

  const table = useMaterialReactTable<BookCopy>({
    columns,
    data: bookData,

    initialState: {
      showColumnFilters: true,
      columnOrder: [
        "id",
        "book",
        "owner",
        "createdAt",
        "quantity",
        "rentalPrice",
        "condition",
        "actions",
      ],
    },
  });

  return (
    <Box mt={4}>
      <CustomText
        text="Book Requests"
        fontSize={24}
        fontWeight={500}
        mb={3}
        mt={3}
      />
      <MaterialReactTable table={table} />
    </Box>
  );
};
export default BookRequests;

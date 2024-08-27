import { Box, capitalize, IconButton, ThemeProvider } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { BookCopy } from "../../types/bookTypes";
import { deleteBook } from "../Book/bookActions";
import { useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { Create, Delete } from "@mui/icons-material";
import EditBookForm from "../Book/EditBookForm";
import CustomText from "../../components/Typography/CustomText";
import { theme } from "../../utils";
import Circle from "../../components/Circle";
import { LightTextColor } from "../../config/constants";
import SmoothAreaChart from "../../components/Chart/AreaChart";

export default function LiveBookStatus() {
  const dispatch = useAppDispacth();
  const { approvedCopies } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  const { rents, ownerRents } = useAppSelector((state) => state.rents);

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
  const bookData = approvedCopies ?? [];

  const columns: MRT_ColumnDef<BookCopy>[] = [
    {
      accessorKey: "No",
      header: "No",
      size: 100,
      Cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "book",
      header: "Book No",
      size: 100,
      Cell: ({ cell }) => cell.getValue<BookCopy["book"]>()?.id,
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
      : []),
    {
      accessorKey: "book",
      header: "Book Name",
      size: 100,
      Cell: ({ cell }) =>
        capitalize(cell.getValue<BookCopy["book"]>()?.book_title as string),
    },
    {
      accessorKey: "availability",
      header: "Status",
      size: 100,
      Cell: ({ cell }) => {
        const availability = cell.getValue() as string;
        const circleColor = availability === "available" ? "green" : "red";
        const statusLabel = availability === "available" ? "Free" : "Rented";

        return (
          <Box display="flex" alignItems="center">
            <Circle color={circleColor} />

            <CustomText
              text={statusLabel}
              fontSize={14}
              fontWeight={200}
              color={LightTextColor}
            />
          </Box>
        );
      },
    },
    {
      accessorKey: "rentalPrice",
      header: "Price",
      size: 100,
      Cell: ({ cell }) => {
        return (
          <CustomText
            text={(cell.getValue() as string) + " birr"}
            fontSize={14}
            fontWeight={200}
            color={LightTextColor}
          />
        );
      },

      enableColumnFilter: false,
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
                  <Create sx={{ color: "rgba(0, 0, 0, 1)" }} />
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

    initialState: {
      showColumnFilters: false,
      pagination: { pageSize: 5 },
    },
    enablePagination: true,
    muiTableToolbarProps: {
      sx: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    renderTopToolbarCustomActions: () => (
      <CustomText
        text="Live Book Status"
        fontSize={16}
        fontWeight={700}
        mt={5}
      />
    ),
  });
  const rentData = user?.userType == "admin" ? rents : ownerRents;
  return (
    <ThemeProvider theme={theme}>
      <Box width={"80%"} ml={3} height={"90%"}>
        {" "}
        <MaterialReactTable table={table} />
        <SmoothAreaChart rents={rentData} />
        <EditBookForm open={open} setOpen={setOpen} bookId={bookId} />
      </Box>
    </ThemeProvider>
  );
}

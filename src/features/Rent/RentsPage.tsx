import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { Box } from "@mui/material";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import LayoutWithDrawer from "../../components/Layout/LayoutWithDrawer";
import { Rent } from "../../types/rentType";
import { fetchOwnerRents, fetchRents } from "./rentAction";

const RentsPage = () => {
  const dispatch = useAppDispacth();
  const { rents, ownerRents } = useAppSelector((state) => state.rents);
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user?.userType == "admin") {
      dispatch(fetchRents());
    } else {
      dispatch(fetchOwnerRents());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookData = user?.userType === "owner" ? ownerRents ?? [] : rents ?? [];

  const columns: MRT_ColumnDef<Rent>[] = [
    {
      accessorKey: "bookCopy",
      header: "Title",
      size: 100,
      Cell: ({ cell }) => cell.getValue<Rent["bookCopy"]>()?.book?.book_title,
    },
    {
      accessorKey: "bookCopyId",
      header: "Copy ID",
      size: 100,
    },
    {
      accessorKey: "createdAt",
      header: "Rented At",
      size: 100,
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue() as string);
        return date.toLocaleDateString();
      },
      enableColumnFilter: false,
    },

    {
      accessorKey: "bookCopy",
      header: "Category",
      size: 150,
      Cell: ({ cell }) =>
        cell.getValue<Rent["bookCopy"]>()?.book?.Category?.category_name,
    },
    {
      accessorKey: "renter",
      header: "Rented By",
      size: 150,
      Cell: ({ cell }) =>
        `${cell.getValue<Rent["renter"]>()?.firstName} ${
          cell.getValue<Rent["renter"]>()?.lastName
        }`,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 100,

      enableColumnFilter: false,
      enableSorting: true,
    },

    {
      accessorKey: "bookCopy",
      header: "Rent Price",
      size: 100,
      enableColumnFilter: false,
      enableSorting: true,
      Cell: ({ cell }) => cell.getValue<Rent["bookCopy"]>()?.rentalPrice,
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      size: 150,
    },
    ...(user?.userType == "admin"
      ? [
          {
            accessorKey: "owner",
            header: "Owner",
            size: 150,

            Cell: ({ cell }) => {
              const owner = cell.getValue() as Rent["owner"] | undefined;
              return owner
                ? `${owner.firstName} ${owner.lastName}`
                : "Not Available";
            },
          },
        ]
      : []),
  ];

  const table = useMaterialReactTable<Rent>({
    columns,
    data: bookData,
    initialState: { showColumnFilters: true },
  });

  return (
    <LayoutWithDrawer title="Rents">
      <Box py={8} pl={4}>
        <Box width={"95%"} mt={4}>
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </LayoutWithDrawer>
  );
};
export default RentsPage;

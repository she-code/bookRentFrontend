import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { User } from "../../types/userTypes";
import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchCustomers } from "../User/userActions";
import { Box } from "@mui/material";

import LayoutWithDrawer from "../../components/Layout/LayoutWithDrawer";

export default function CustomersPage() {
  const dispatch = useAppDispacth();
  const { customers } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 200,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 200,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
      enableColumnFilter: true,
    },
    {
      accessorKey: "createdAt",
      header: "Registered At",
      size: 150,
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue() as string); // Convert the value to a Date object
        return date.toLocaleDateString(); // Format as a locale-specific date string
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 150,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      enableColumnFilter: false,
    },
  ];
  const table = useMaterialReactTable<User>({
    columns,
    data: customers ?? [],
    initialState: { showColumnFilters: true },
  });

  return (
    <LayoutWithDrawer title="Customers">
      {" "}
      <Box py={8} pl={4}>
        <Box width={"95%"} mt={4}>
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </LayoutWithDrawer>
  );
}

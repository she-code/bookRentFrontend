import { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { User } from "../../types/userTypes";
import CustomButton from "../../components/Button/CustomButton";
import { Box } from "@mui/material";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import {
  fetchOwnerRequests,
  updateOwnerStatusThunk,
} from "../User/userActions";
// import { citiesList, data, type Person, usStateList } from "./makeData";

const OwnerRequests = () => {
  const dispatch = useAppDispacth();
  const { ownerRequests } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchOwnerRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApprove(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateOwnerStatusThunk({ id, status: "approved" }));
    }
  }

  function handleReject(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateOwnerStatusThunk({ id, status: "rejected" }));
    }
  }
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
      size: 250,
      enableColumnFilter: false,
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
      accessorKey: "requestStatus",
      header: "Request Status",
      size: 150,
      enableColumnFilter: false,
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
  const table = useMaterialReactTable<User>({
    columns,
    data: ownerRequests,
    initialState: { showColumnFilters: true },
  });

  return (
    <Box width={"95%"} mt={4}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OwnerRequests;

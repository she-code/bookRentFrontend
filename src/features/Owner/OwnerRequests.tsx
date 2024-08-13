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
  updateOwnerApprovalThunk,
} from "../User/userActions";
import CustomText from "../../components/Typography/CustomText";
// import { citiesList, data, type Person, usStateList } from "./makeData";

const OwnerRequests = () => {
  const dispatch = useAppDispacth();
  const { ownerRequests } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchOwnerRequests());
  }, [dispatch]);

  function handleApprove(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateOwnerApprovalThunk({ id, action: "approve" }));
    }
  }

  function handleReject(id: number | undefined): void {
    if (id !== undefined) {
      dispatch(updateOwnerApprovalThunk({ id, action: "reject" }));
    }
  }
  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 100,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 100,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 100,
      enableColumnFilter: false,
    },
    {
      accessorKey: "createdAt",
      header: "Registered At",
      size: 100,
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue() as string); // Convert the value to a Date object
        return date.toLocaleDateString(); // Format as a locale-specific date string
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 100,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      enableColumnFilter: false,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      size: 100,
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
    data: ownerRequests?.length > 0 ? ownerRequests : [],
    initialState: { showColumnFilters: true },
  });

  return (
    <Box mt={4} width={"90%"}>
      <CustomText
        text="Owner Requests"
        fontSize={24}
        fontWeight={500}
        mb={3}
        mt={3}
      />
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OwnerRequests;

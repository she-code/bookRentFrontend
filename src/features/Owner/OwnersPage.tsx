import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { User } from "../../types/userTypes";
import { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import {
  fetchOwners,
  updateOwnerApprovalThunk,
  updateOwnerStatusThunk,
} from "../User/userActions";
import {
  Box,
  capitalize,
  FormControlLabel,
  IconButton,
  Switch,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../../components/Button/CustomButton";
import { Delete } from "@mui/icons-material";
import { Secondary_Color } from "../../config/constants";
import { getColor, theme } from "../../utils";
import CustomNavHeading from "../../components/Navigation/CustomNavHeading";
import CustomText from "../../components/Typography/CustomText";
import { fetchBooks } from "../Book/bookActions";
import OwnerDetails from "./OwnerDetails";

export default function OwnersPage() {
  const dispatch = useAppDispacth();
  const { owners } = useAppSelector((state) => state.users);
  const { books } = useAppSelector((state) => state.books);
  useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOwnerStatus(
    id: number | undefined,
    isDisabled: boolean
  ): void {
    dispatch(
      updateOwnerStatusThunk({ id: id as number, isDisabled: !isDisabled })
    );
  }
  const [open, setOpen] = useState(false);
  const [ownerId, setOwnerId] = useState(0);

  const handleView = (id: number) => {
    setOwnerId(id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your approval logic here
    console.log(`Approved item with ID: ${id}`);
    // dispatch(deleteBook(id));
  };
  function handleApprove(id: number | undefined, isApproved: boolean): void {
    if (id !== undefined) {
      dispatch(
        updateOwnerApprovalThunk({
          id,
          action: isApproved ? "reject" : "approve",
        })
      );
    }
  }
  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "Owner",
      size: 200,
      Cell: ({ row }) => {
        const firstName = capitalize(row.original.firstName);
        const lastName = capitalize(row.original.lastName);
        return `${firstName} ${lastName}`;
      },
    },

    {
      accessorKey: "upload",
      header: "Upload",
      size: 100,
      Cell: ({ row }) => {
        const bookCount = books.filter(
          (book) => book.ownerId === row.original.id
        ).length;
        return `${bookCount} Books`;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 150,
      Cell: ({ cell }) => capitalize(cell.getValue() as string),
    },

    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      Cell: ({ row }) => (
        <FormControlLabel
          sx={{
            backgroundColor: "rgba(0, 128, 0, 0.1)",
            borderRadius: 5,
            px: 2,
            color: getColor(!row.original.isDisabled as boolean),
          }}
          control={
            <Switch
              checked={row.original.isDisabled === false}
              onChange={() =>
                handleOwnerStatus(
                  row.original.id,
                  row.original.isDisabled as boolean
                )
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
            !row.original.isDisabled ? "Active" : ("Inactive" as string)
          )}
          labelPlacement="start"
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      size: 100,
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({ row }) => (
        <Box display={"flex"} gap={2}>
          {" "}
          <IconButton onClick={() => handleView(row?.original?.id as number)}>
            <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 1)" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(row?.original?.id as number)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
          <CustomButton
            mr={2}
            text={
              (!row.original.isApproved as boolean) ? "Approve" : "Approved"
            }
            variant="contained"
            bgColor={
              (!row.original.isApproved as boolean)
                ? "grey"
                : `${Secondary_Color}`
            }
            textColor="white"
            handleClick={() =>
              handleApprove(row.original.id, row.original.isApproved as boolean)
            }
          />
        </Box>
      ),
    },
  ];
  const table = useMaterialReactTable<User>({
    columns,
    data: owners?.length > 0 ? owners : [],
    initialState: { showColumnFilters: false },
    muiTopToolbarProps: {
      sx: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    renderTopToolbarCustomActions: () => (
      <CustomText text="List Of Owners" fontSize={16} fontWeight={700} mt={5} />
    ),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box pl={4}>
        <CustomNavHeading title={"Admin"} sub="Owners" />
        <Box mt={4}>
          <MaterialReactTable table={table} />
        </Box>
        <OwnerDetails open={open} setOpen={setOpen} ownerID={ownerId} />
      </Box>
    </ThemeProvider>
  );
}

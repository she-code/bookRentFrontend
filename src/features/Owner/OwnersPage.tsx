import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { User } from "../../types/userTypes";
import { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchOwners, updateOwnerStatusThunk } from "../User/userActions";
import {
  Box,
  capitalize,
  createTheme,
  FormControlLabel,
  IconButton,
  Switch,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../../components/Button/CustomButton";
import { Delete } from "@mui/icons-material";
import { Secondary_Color } from "../../config/constants";
import { theme } from "../../utils";

export default function OwnersPage() {
  const dispatch = useAppDispacth();
  const { owners } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchOwners());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOwnerStatus(
    id: number | undefined,
    isDisabled: boolean
  ): void {
    dispatch(
      updateOwnerStatusThunk({ id: id as number, isDisabled: isDisabled })
    );
  }
  const [open, setOpen] = useState(false);
  const [bookId, setBookID] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleEdit = (id: number) => {
    setBookID(id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your approval logic here
    console.log(`Approved item with ID: ${id}`);
    // dispatch(deleteBook(id));
  };

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
      accessorKey: "email",
      header: "Upload",
      size: 100,
    },

    {
      accessorKey: "location",
      header: "Location",
      size: 150,
    },

    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      Cell: ({ row }) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.original.status == "active" ? true : false}
              onChange={handleChange}
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
          label={capitalize(row.original.status as string)}
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
          <IconButton onClick={() => handleEdit(row?.original?.id as number)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row?.original?.id as number)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
          <CustomButton
            mr={2}
            text={(row.original.isDisabled as boolean) ? "Approve" : "Approved"}
            variant="contained"
            bgColor={
              (row.original.isDisabled as boolean)
                ? "grey"
                : `${Secondary_Color}`
            }
            textColor="white"
            handleClick={() =>
              handleOwnerStatus(
                row.original.id,
                !row.original.isDisabled as boolean
              )
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
  });

  return (
    <ThemeProvider theme={theme}>
      <Box py={8} pl={4}>
        <Box width={"95%"} mt={4}>
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

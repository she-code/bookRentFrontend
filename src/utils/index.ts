import { createTheme } from "@mui/material";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export const formatDate = (date) => {
  return format(date, "EEE, dd MMM, yyyy, hh.mm a", { locale: enGB });
};
export const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
          borderRadius: "8px",
          padding: "16px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          border: "none",
          fontWeight: 300,
          fontSize: "14px",
          color: "#656575",
        },
      },
    },
  },
});

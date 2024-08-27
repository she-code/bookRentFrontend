import { createTheme } from "@mui/material";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
};

export const getColor = (approved: boolean) => (approved ? "green" : "red");

export const getMonthRange = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return { start, end };
};

// Calculate sum of totalAmount for a specific month range
export const sumTotalAmountForMonth = (rents, { start, end }) => {
  return rents
    .filter((rent) => {
      const rentDate = new Date(rent.createdAt);
      return rentDate >= start && rentDate <= end;
    })
    .reduce((total, rent) => total + rent.totalAmount, 0);
};

export const groupRentByMonth = (rents) => {
  const date = new Date();
  const start = startOfYear(date);
  const end = endOfYear(date);

  // Initialize an object to store the total rent per month
  const rentByMonth = Array(12).fill(0);

  rents.forEach((rent) => {
    const rentDate = new Date(rent.createdAt);
    if (rentDate >= start && rentDate <= end) {
      const monthIndex = rentDate.getMonth();
      rentByMonth[monthIndex] += rent.totalAmount;
    }
  });

  // Create labels for the chart
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    labels,
    data: rentByMonth,
  };
};

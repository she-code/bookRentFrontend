import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
} from "@mui/material";
import { User } from "../../types/userTypes";
import { Book } from "../../types/bookTypes";
import { Column } from "../../types/sharedTypes";
import CustomButton from "../Button/CustomButton";

interface SortableTableProps {
  data: User[] | Book[];
  columns: Column[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  handleApprove: (id: number | undefined) => void;
  handleReject: (id: number | undefined) => void;
  pageName?: string;
  text?: string;
}

// const descendingComparator = <T extends object>(
//   a: T,
//   b: T,
//   orderBy: keyof T
// ) => {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// };

// const getComparator = <T extends object>(
//   order: "asc" | "desc",
//   orderBy: keyof T
// ) => {
//   return order === "desc"
//     ? (a: T, b: T) => descendingComparator(a, b, orderBy)
//     : (a: T, b: T) => -descendingComparator(a, b, orderBy);
// };

const EnhancedTableHead: React.FC<{
  order: "asc" | "desc";
  orderBy: keyof User | keyof Book;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User | keyof Book
  ) => void;
  columns: Column[];
}> = ({ order, orderBy, onRequestSort, columns }) => {
  const createSortHandler =
    (property: keyof User | keyof Book) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id}>
            {column.id === "actions" ? (
              column.label
            ) : column.isSortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const SortableTable: React.FC<SortableTableProps> = ({
  data,
  columns,
  pageName,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  handleApprove,
  handleReject,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  //   const [orderBy, setOrderBy] = useState<keyof User | keyof Book >(
  //     columns[0].id
  //   );
  const validOrderByKeys: (keyof User | keyof Book)[] = columns
    .filter((column) => column.isSortable) // Filter out columns that are sortable
    .map((column) => column.id as keyof User | keyof Book); // Extract IDs as valid types

  const [orderBy, setOrderBy] = useState<keyof User | keyof Book>(
    validOrderByKeys.length > 0 ? validOrderByKeys[0] : "id" // Set a default if no valid keys
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof User | keyof Book
  ) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };
  const isUser = (row: User | Book): row is User => {
    return (row as User).firstName !== undefined;
  };

  const isBook = (row: User | Book): row is Book => {
    return (row as Book).book_title !== undefined;
  };

  const getComparator = (
    order: "asc" | "desc",
    orderBy: keyof User | keyof Book
  ) => {
    return (a: User | Book, b: User | Book) => {
      if (isUser(a) && isUser(b)) {
        const aValue = a[orderBy as keyof User];
        const bValue = b[orderBy as keyof User];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "desc"
            ? (bValue as string).localeCompare(aValue as string)
            : (aValue as string).localeCompare(bValue as string);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "desc"
            ? (bValue as number) - (aValue as number)
            : (aValue as number) - (bValue as number);
        } else if (orderBy === "createdAt" && aValue && bValue) {
          return order === "desc"
            ? new Date(bValue as string).getTime() -
                new Date(aValue as string).getTime()
            : new Date(aValue as string).getTime() -
                new Date(bValue as string).getTime();
        }
      } else if (isBook(a) && isBook(b)) {
        const aValue = a[orderBy as keyof Book];
        const bValue = b[orderBy as keyof Book];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "desc"
            ? (bValue as string).localeCompare(aValue as string)
            : (aValue as string).localeCompare(bValue as string);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "desc"
            ? (bValue as number) - (aValue as number)
            : (aValue as number) - (bValue as number);
        } else if (orderBy === "createdAt" && aValue && bValue) {
          return order === "desc"
            ? new Date(bValue as string).getTime() -
                new Date(aValue as string).getTime()
            : new Date(aValue as string).getTime() -
                new Date(bValue as string).getTime();
        }
      }
      return 0;
    };
  };

  // const sortedData = data.slice().sort(getComparator(order, orderBy));

  // const paginatedData = sortedData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    ownerLocation: "",
    category: "",
    author: "",
  });
  const applyFilters = (data: User[] | Book[]) => {
    return data.filter((item) => {
      if (
        searchTerm &&
        !JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.ownerLocation &&
        isBook(item) &&
        item.Owner?.location !== filters.ownerLocation
      ) {
        return false;
      }
      if (
        filters.category &&
        isBook(item) &&
        item.Category?.category_name !== filters.category
      ) {
        return false;
      }
      if (filters.author && isBook(item) && item.author !== filters.author) {
        return false;
      }
      return true;
    });
  };

  const filteredData = applyFilters(data);
  const sortedData = filteredData.slice().sort(getComparator(order, orderBy));
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={(row as User).id || (row as Book).id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "firstName" ? (
                      isUser(row) ? (
                        `${row.firstName} ${row.lastName}`
                      ) : (
                        "N/A"
                      )
                    ) : column.id === "createdAt" ? (
                      row[column.id] ? (
                        new Date(row[column.id] as string).toLocaleDateString()
                      ) : (
                        "N/A"
                      )
                    ) : column.id === "actions" ? (
                      <>
                        {pageName?.toString() == "ownerRequests" ||
                        pageName?.toString() == "bookRequests" ? (
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <CustomButton
                              mr={2}
                              text={"Approve"}
                              variant="contained"
                              bgColor="green"
                              textColor="white"
                              handleClick={() =>
                                handleApprove(row.id as number)
                              }
                            />
                            <CustomButton
                              text="Reject"
                              variant="contained"
                              bgColor="red"
                              textColor="white"
                              handleClick={() => handleReject(row.id as number)}
                            />
                          </Box>
                        ) : (
                          <>
                            {" "}
                            <CustomButton
                              mr={2}
                              text={"Approve"}
                              variant="contained"
                              bgColor="green"
                              textColor="white"
                              handleClick={() =>
                                handleApprove(row.id as number)
                              }
                            />
                          </>
                        )}
                      </>
                    ) : (
                      row[column.id as keyof typeof row] ?? "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SortableTable;

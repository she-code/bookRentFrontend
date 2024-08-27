import { useEffect, useRef } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";

import { Box } from "@mui/material";
import MonthStastics from "./MonthStastics";
import LiveBookStatus from "./LiveBookStatus";
import CustomNavHeading from "../../components/Navigation/CustomNavHeading";
import { fetchApprovedCoppies } from "../Book/bookActions";
import { BookCopy } from "../../types/bookTypes";
import { deepEqual } from "../../utils";
import { fetchOwnerRents, fetchRents } from "../Rent/rentAction";

export default function PersistentDrawerLeft() {
  const dispatch = useAppDispacth();
  const { approvedCopies } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  const prevApprovedCopiesRef = useRef<BookCopy[]>();

  useEffect(() => {
    if (!deepEqual(prevApprovedCopiesRef.current, approvedCopies)) {
      dispatch(fetchApprovedCoppies());
      prevApprovedCopiesRef.current = approvedCopies;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedCopies, dispatch]);
  useEffect(() => {
    dispatch(fetchRents());
    dispatch(fetchOwnerRents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CustomNavHeading
        title={user?.userType == "admin" ? "Admin" : "Owner"}
        sub="Dashboard"
      />
      <Box sx={{ display: "flex", mb: 3 }}>
        <MonthStastics />
        <LiveBookStatus />
      </Box>
    </>
  );
}

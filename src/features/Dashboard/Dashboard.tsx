import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchUser } from "../Auth/authActions";

import { Box, Paper } from "@mui/material";
import CustomText from "../../components/Typography/CustomText";
import MonthStastics from "./MonthStastics";
import LiveBookStatus from "./LiveBookStatus";

export default function PersistentDrawerLeft() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispacth();

  useEffect(() => {
    dispatch(fetchUser()).finally(() => {
      // setIsContentLoaded(true); // Set content loaded to true after fetching
    });
  }, [dispatch]);

  return (
    // <LayoutWithDrawer title="Dashboard">
    <>
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "none", mb: 4 }}>
        <CustomText
          text="Dashboard"
          fontSize={22}
          fontWeight={400}
          color="grey"
          ml={4}
        />
      </Paper>
      <Box sx={{ display: "flex" }}>
        <MonthStastics />
        <LiveBookStatus />
      </Box>
      {/* {user?.userType === "admin" ? <AdminContent /> : <OwnerContent />} */}
      {/* </LayoutWithDrawer> */}
    </>
  );
}

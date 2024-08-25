import React, { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

import { fetchUser } from "../features/Auth/authActions";
import { Box } from "@mui/material";
import { Background_Color } from "../config/constants";
import CustomSidebar from "./SideBar/CustomSidebar";
import { useMatch } from "raviger";
export default function AppContainer(props: {
  children: React.ReactNode;
  collapsed: boolean;
  toggleSidebar: () => void;
}) {
  const dispatch = useAppDispacth();
  const user = useAppSelector((state: RootState) => state.users.user);
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchOwners = useMatch("/owners");
  const matchDashboard = useMatch("/dashboard");
  const matchBooks = useMatch("/books");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        backgroundColor: `${Background_Color}`,
      }}
    >
      {(matchOwners || matchDashboard || matchBooks) && (
        <CustomSidebar user={user} />
      )}

      <Box sx={{ width: "100%", mx: "auto", p: 6, pt: 2 }}>
        {props.children}
      </Box>
    </Box>
  );
}

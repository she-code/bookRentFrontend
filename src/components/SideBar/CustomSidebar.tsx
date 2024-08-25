import { useEffect, useState } from "react";
import { User } from "../../types/userTypes";
import UserProfile from "../../features/User/UserProfile";
import SidebarData from "./SideBarData";
import { Box, IconButton } from "@mui/material";
import { Primary_Color } from "../../config/constants";
import { ArrowBackIos } from "@mui/icons-material";

export default function CustomSidebar(props: { user: User | null }) {
  const [toggle, setToggle] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    isSmallScreen ? setToggle(true) : setToggle(false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen]);
  return (
    <Box
      sx={{
        mt: 2,
        p: 4,
        borderRadius: "30px",
        ml: 6,
        transition: "all 0.5s",
        backgroundColor: `${Primary_Color}`,
        position: "relative",
        width: toggle ? "5.8rem" : "20rem",
        height: "90%",
        backdropFilter: "blur(10px)",
      }}
    >
      <UserProfile toggle={toggle} user={props.user as User} />
      <SidebarData toggle={toggle} />

      <Box
        sx={{
          position: "absolute",
          top: "7rem",
          left: "-20px",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        <IconButton
          onClick={() => setToggle(!toggle)}
          sx={{
            minWidth: 0,
            padding: 0,
          }}
        >
          <ArrowBackIos />
        </IconButton>
      </Box>
    </Box>
  );
}

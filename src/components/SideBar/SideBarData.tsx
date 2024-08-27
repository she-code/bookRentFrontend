import {
  Book,
  Dashboard,
  Login,
  Logout,
  People,
  Shop,
  Upload,
} from "@mui/icons-material";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/Auth/authActions";
import { ActiveLink, navigate } from "raviger";
import { getAuthToken } from "../../utils/storageUtils";
import { Box, Button, Typography } from "@mui/material";
import { defineAbilitiesFor } from "../../utils/ability";
import { User } from "../../types/userTypes";
import { Secondary_Color } from "../../config/constants";

const SidebarData = (props: { toggle: boolean }) => {
  const { toggle } = props;
  const dispatch = useAppDispacth();
  const { user } = useAppSelector((state) => state.auth);
  const ability = defineAbilitiesFor(user as User);
  function handleLogout(): void {
    dispatch(logoutUser());
    navigate("/");
  }

  const data = [
    {
      page: "Dashboard",
      url: "/dashboard",
      icon: <Dashboard />,
    },
    ...(ability.can("view", "Owners")
      ? [{ page: "Owners", url: "/owners", icon: <People /> }]
      : []),
    ...(ability.can("view", "UploadBook")
      ? [{ page: "Upload Book", url: "/uploadBook", icon: <Upload /> }]
      : []),
    { page: "Books", url: "/books", icon: <Book /> },
    { page: "Rents", url: "/rents", icon: <Shop /> },

    ...(getAuthToken()
      ? [
          {
            page: "Logout",
            icon: <Logout />,
            onclick: () => {
              handleLogout();
            },
          },
        ]
      : [
          {
            page: "Login",
            url: "/login",
            iocn: <Login />,
          },
        ]),
  ];
  return (
    <Box>
      {data?.map((link) =>
        link.url ? (
          <ActiveLink
            role="link"
            tabIndex={0}
            aria-label={link.page}
            href={link.url}
            key={link.page}
            exactActiveClass={`backgroundColor:${Secondary_Color}`}
            style={{
              padding: "1rem",
              fontSize: "1.25rem",
              display: "flex",
              alignItems: "center",
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
              justifyContent: "start",
              color: "white",
              textDecoration: "none",
              left: link.url && "1rem",
              bottom: link.url && "1rem",
            }}
            className={toggle ? "last:w-[3.6rem]" : "last:w-[20rem]"}
          >
            <Box
              sx={{
                marginRight: "2rem",
                fontSize: "1.7rem",
                color: "white",
              }}
            >
              {link.icon}
            </Box>
            <Typography
              sx={{
                opacity: toggle ? 0 : 1,
                transitionDelay: toggle ? "200ms" : "0ms",
                color: "white",
                whiteSpace: "pre",
              }}
            >
              {link.page}
            </Typography>
          </ActiveLink>
        ) : (
          <Button
            key={link.page}
            tabIndex={0}
            aria-label={link.page}
            onClick={link.onclick}
            sx={{
              padding: "0.75rem",
              fontSize: "1rem",
              margin: "0.5rem",
              width: toggle ? "3.6rem" : "14rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.5rem",
              cursor: "pointer",
              backgroundColor: "#555",
              color: "white",
              transition: "all 0.3s",
              position: "absolute",
              left: "1rem",
              bottom: "1rem",
              "&:hover": {
                backgroundColor: "white",
                color: "brown",
              },
            }}
          >
            {toggle ? link.icon : link.page}
          </Button>
        )
      )}
    </Box>
  );
};

export default SidebarData;

import { Drawer, IconButton, styled, useTheme } from "@mui/material";
import { useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link } from "raviger";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import Logo from "../Typography/Logo";
import { fetchUser } from "../../features/Auth/authActions";

export default function SideBar(props: {
  open: boolean;
  setOpen: (par: boolean) => void;
}) {
  const { open, setOpen } = props;
  const theme = useTheme();
  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispacth();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StyledNavLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: "inherit",

    "&.active": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.action.selected,
    },
  }));

  const ownerMenuItems = ["Dashboard", "Books", "Rents"];
  const adminMenuItems = ["Dashboard", "Owners", "Books", "Customers", "Rents"];
  const menuItems =
    user?.userType === "admin" ? adminMenuItems : ownerMenuItems;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo my={0} mr={4} fontSize={18} />
        </Link>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((text, index) => (
          <ListItem key={text} disablePadding>
            {/* <ListItemButton
              component={StyledNavLink}
              to={`/${text.toLowerCase().replace(" ", "-")}`}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton> */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

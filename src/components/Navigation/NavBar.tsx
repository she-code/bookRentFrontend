import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Logo from "../Typography/Logo";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchCategories } from "../../features/Category/categoryActions";
import LinkButton from "../Button/LinkButton";
import CustomButton from "../Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, logoutUser } from "../../features/Auth/authActions";

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispacth();
  const { categories } = useAppSelector((state) => state.categories);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleLogout(): void {
    dispatch(logoutUser());
    navigate("/");
  }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box mx={6}>
        <Toolbar>
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // flexGrow: 1,
              // justifyContent: "space-evely",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box mr={3}>
                <Logo my={2} />
              </Box>
            </Link>

            <IconButton
              edge="start"
              sx={{ p: 2 }}
              // color="black"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon sx={{ width: "20px", mr: 2, color: "black" }} />{" "}
              <Typography fontSize={18} color={"black"}>
                Categories
              </Typography>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {categories?.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  style={{ textDecoration: "none" }}
                  key={category.id}
                >
                  <MenuItem onClick={handleMenuClose}>
                    {category.category_name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Center Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 2,
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              sx={{ width: "50%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                {" "}
                <CustomButton
                  text="Logout"
                  handleClick={handleLogout}
                  variant="contained"
                  bgColor={"primary"}
                  mr={4}
                />
                {user.userType == "customer" ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <CustomButton
                      text="Dashboard"
                      bgColor={"#171B36"}
                      variant="contained"
                      handleClick={() => navigate("/dashboard")}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <CustomButton
                  mr={4}
                  text="Sign In"
                  bgColor={"primary"}
                  variant="contained"
                  handleClick={() => navigate("/login")}
                />{" "}
                <LinkButton to="/signup" text="Register As Owner" width={400} />
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default NavBar;

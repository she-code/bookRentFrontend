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
import { useNavigate } from "react-router-dom";

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
  const { user } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Box mr={3}>
              <Logo my={2} />
            </Box>

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
                <MenuItem onClick={handleMenuClose} key={category.id}>
                  {category.category_name}
                </MenuItem>
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

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user ? (
              user.userType == "customer" ? (
                <LinkButton to="/requestToBeOwner" text="Become Book Owner" />
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
              )
            ) : (
              <>
                <LinkButton to="/login" text="Sign in" />
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default NavBar;

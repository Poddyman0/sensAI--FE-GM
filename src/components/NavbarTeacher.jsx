import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export const NavbarTeacher = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{display: {xs: "block", sm: "block", md: "block", lg: "none"}}}
      >
        <MenuIcon sx={{ color: "black", fontSize: 40 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to="/">
        <MenuItem onClick={handleClose}>
          <HomeIcon sx={{ mr: 2 }} />
          Home
        </MenuItem>
        </Link>
        <Link to="/teacher/classes">
          <MenuItem onClick={handleClose}>
            <SchoolIcon sx={{ mr: 2 }} />
            Classes
          </MenuItem>
        </Link>
        <Link to="/teacher/assignments/new">
          <MenuItem onClick={handleClose}>
            <AssignmentIcon sx={{ mr: 2 }} />
            New Assignment
          </MenuItem>
        </Link>
        <Link to="/teacher/lessons/new">
          <MenuItem onClick={handleClose}>
            <SchoolIcon sx={{ mr: 2 }} />
            New Lesson
          </MenuItem>
        </Link>
        <Link to={"/user/"}>
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon sx={{ mr: 2 }} />
          Profile
          </MenuItem>
          </Link>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

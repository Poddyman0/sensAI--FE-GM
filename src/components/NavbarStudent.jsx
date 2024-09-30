/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";

export const NavbarStudent = ({ handleLogout }) => {
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
        sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
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
        <Link to="/student/classes/">
          <MenuItem onClick={handleClose}>
            <SchoolIcon sx={{ mr: 2 }} />
            Classes
          </MenuItem>
        </Link>
        <Link to="/student/assignments">
          <MenuItem onClick={handleClose}>
            <AssignmentIcon sx={{ mr: 2 }} />
            Assignments
          </MenuItem>
        </Link>
        <Link to="/student/lessons">
          <MenuItem onClick={handleClose}>
            <SchoolIcon sx={{ mr: 2 }} />
            Lessons
          </MenuItem>
        </Link>
        <Link to="/student/teachers">
          <MenuItem onClick={handleClose}>
            <GroupsIcon sx={{ mr: 2 }} />
            Teachers
          </MenuItem>
        </Link>
        <Link to="/user/">
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

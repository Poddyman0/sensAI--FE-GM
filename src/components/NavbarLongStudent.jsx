/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NavbarLongStudent = ({ handleLogout }) => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        mt: "auto",
        mb: "auto",
      }}
    >
      <Link to="/">
        <Button sx={{ color: "black", fontSize: 15 }}>Home</Button>
      </Link>
      <Link to="/student/classes/">
        <Button sx={{ color: "black", fontSize: 15 }}>Classes</Button>
      </Link>
      <Link to="/student/assignments">
        <Button sx={{ color: "black", fontSize: 15 }}>Assignment</Button>
      </Link>
      <Link to="/student/lessons">
        <Button sx={{ color: "black", fontSize: 15 }}>Lesson</Button>
      </Link>
      <Link to="/student/teachers">
        <Button sx={{ color: "black", fontSize: 15 }}>Teachers</Button>
      </Link>
      <Link to="/user/">
        <Button sx={{ color: "black", fontSize: 15 }}>My Account</Button>
      </Link>
      <Button sx={{ color: "black", fontSize: 15 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

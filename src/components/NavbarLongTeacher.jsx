import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NavbarLongTeacher = ({ handleLogout }) => {
    return (
    <Box sx={{ display: { xs: 'none',sm: "none", lg: "block"}, mt: "auto", mb: "auto" }}>
             <Link to="/">
             <Button sx={{ color: 'black', fontSize: 15 }}>
                Home
              </Button>
              </Link>
              <Link to="/teacher/classes">
              <Button sx={{ color: 'black', fontSize: 15 }}>
                Classes
              </Button>
              </Link>
              <Link to="/teacher/assignments/new">
              <Button sx={{ color: 'black', fontSize: 15 }}>
                New Assignment
              </Button>
              </Link>
              <Link to="/teacher/lessons/new">
              <Button sx={{ color: 'black', fontSize: 15 }}>
                New Lesson
              </Button>
              </Link>
              <Link to="/user/">
              <Button sx={{ color: 'black', fontSize: 15 }}>
                My Account
              </Button>
              </Link>
              <Button sx={{ color: 'black', fontSize: 15 }} onClick={handleLogout}>
                Logout
              </Button>
          </Box>
          )
}
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { getClassesByTeacherID } from "../utils/api";
import { Container, Divider, Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TeacherClassesCard } from "./TeacherClassesCard";

const Home = ({ user }) => {
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(localStorage.getItem("loggedUser"));
  const navigate = useNavigate("/login");

  let userStatus = null;

  if (user === "logged out") {
    userStatus = "";
  } else if (user === "null") {
    userStatus = "";
  } else if (user && user.role === "student") {
    userStatus = `Logged in as STUDENT-${user.id}`;
  } else if (user && user.role === "teacher") {
    userStatus = `Logged in as TEACHER-${user.id}`;
  }

  useEffect(() => {
    if (!logged && !user.id) {
      navigate("/login");
    } else if (user && userStatus !== "") {
      setLoading(true);
      getClassesByTeacherID(user.id)
        .then(({ classes }) => {
          setClasses(classes);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  let link = "";

  if (loading) {
    return (
      <>
        <Typography pl={3} pr={3} variant="h1">
          <Skeleton />
        </Typography>

        <Typography pl={3} pt={1} pr={3} variant="h1">
          <Skeleton />
        </Typography>

        <Typography pl={3} pt={1} pr={3} variant="h1">
          <Skeleton />
        </Typography>
      </>
    );
  }

  if (Object.keys(classes).length > 0) {
    return (
      <>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            mt: 5,
            cursor: "pointer",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            borderRadius: "5px",
            borderColor: "lightblue",
            ":hover": {
              backgroundColor: "rgb(7, 77, 177, 0.22)", // theme.shadows[20]
            },
          }}
          variant="outlined"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    align="center"
                  >
                    {userStatus}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  <SchoolIcon />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            mt: 5,
            cursor: "pointer",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            borderRadius: "5px",
            borderColor: "lightblue",
            ":hover": {
              backgroundColor: "rgb(7, 77, 177, 0.22)", // theme.shadows[20]
            },
          }}
          variant="outlined"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    align="center"
                  >
                    Your Current Classes
                  </Typography>

                  <ul>
                    {classes.map((group) => {
                      return (
                        <li key={group.id}>
                          {user && user.role === "student" ? (
                            <Link to={`/student/classes/`}>
                              <TeacherClassesCard classItem={group} />
                            </Link>
                          ) : (
                            <Link to={`/teacher/classes/${group.id}`}>
                              <TeacherClassesCard classItem={group} />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
};

export default Home;

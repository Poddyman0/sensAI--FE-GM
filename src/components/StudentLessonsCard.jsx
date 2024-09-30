import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import moment from "moment";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export const StudentLessonsCard = ({ lessonData }) => {
  const [lessonDescription, setLessonDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (lessonData) {
      let counter = 0;
      const description = lessonData.body
        .split("")
        .filter((char) => {
          if (char === " ") {
            counter++;
          }
          if (counter !== 10 && counter <= 10) {
            return char;
          }
        })
        .join("");
      setLessonDescription(description);
    }
  }, []);

  function handleAssignmentToDisplay(lesson) {
    navigate(`/student/lessons/${lesson.id}`);
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        mt: 5,
        mb: 5,
        cursor: "pointer",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Title: {lessonData.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {lessonDescription}...
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Created at: {moment(lessonData.created_at).format("LL")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <SchoolIcon />
            </Typography>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              handleAssignmentToDisplay(lessonData);
            }}
            sx={{ mt: 3 }}
          >
            View this lesson
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { deleteLessonByLessonID } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import moment from "moment";

export const TeacherLessonCard = ({ lessonData }) => {
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [lessonDescription, setLessonDescription] = useState("");

  const navigate = useNavigate();

  function handleLessonToDisplay(lessonData) {
    navigate(`/teacher/${lessonData.id}/lessons`);
  }

  function handleLessonToDelete(lessonData) {
    if (lessonData.id) {
      const lesson_id = lessonData.id;
      deleteLessonByLessonID(lesson_id);
      setSuccessSubmit(true);
      setTimeout(() => {
        setSuccessSubmit(false);
      }, 2000);
    }
  }
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
                Description: {lessonDescription}...
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Created at: {moment(lessonData.created_at).format("LL")}
              </Typography>
              <Box mt={3}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleLessonToDisplay(lessonData);
                  }}
                >
                  View this lesson
                </LoadingButton>
              </Box>
              <Box mt={2}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleLessonToDelete(lessonData);
                  }}
                >
                  Delete this lesson
                </LoadingButton>
              </Box>
              {successSubmit ? (
                <Grid item mb={2} ml={3} mr={3} xs={12}>
                  <Alert severity="success">Lesson successfully deleted!</Alert>
                </Grid>
              ) : (
                <></>
              )}
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
  );
};

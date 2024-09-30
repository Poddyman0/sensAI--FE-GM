/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const StudentAssignmentsCard = ({ assignmentData }) => {
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (assignmentData) {
      let counter = 0;
      const description = assignmentData.body
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
      setAssignmentDesc(description);
    }
  });

  function handleAssignmentToDisplay(assignment_id) {
    navigate(`/student/assignments/${assignment_id}`);
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
                Title: {assignmentData.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Description: {assignmentDesc}...
              </Typography>
              <Typography variant="body2" gutterBottom>
                Due date: {moment(assignmentData.due_date).format("LL")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Created at: {moment(assignmentData.created_at).format("LL")}
              </Typography>
              <Box mt={3}></Box>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAssignmentToDisplay(assignmentData.assignment_id);
                }}
              >
                View this assignment
              </LoadingButton>
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

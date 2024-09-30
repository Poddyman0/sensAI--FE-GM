import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAssignmentByAssignmentID } from "../utils/api";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import moment from "moment";

export function TeacherClassClassIDAssignmentsCard({
  teacherClassAssignmentData,
}) {
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [assignmentDesc, setAssignmentDesc] = useState("");

  const navigate = useNavigate();
  const { class_id } = useParams();
  function handleAssignmentToDisplay(assignment) {
    navigate(`/teacher/assignments/${assignment.id}`);
  }

  function handleAssigmenttoDelete(assignment) {
    if (assignment.id) {
      const assignment_id = assignment.id;
      deleteAssignmentByAssignmentID(assignment_id);
      setSuccessSubmit(true);
      setTimeout(() => {
        setSuccessSubmit(false);
      }, 2000);
    }
  }

  useEffect(() => {
    if (teacherClassAssignmentData) {
      let counter = 0;
      const description = teacherClassAssignmentData.body
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
                Title: {teacherClassAssignmentData.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Description: {assignmentDesc}...
              </Typography>
              <Typography variant="body2" gutterBottom>
                Due date:{" "}
                {moment(teacherClassAssignmentData.due_date).format("LL")}
              </Typography>
              <Typography variant="body2">
                Created at:{" "}
                {moment(teacherClassAssignmentData.created_at).format("LL")}
              </Typography>
              <Box mt={3}></Box>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAssignmentToDisplay(teacherClassAssignmentData);
                }}
              >
                View this assignment
              </LoadingButton>
              <Box mt={2}></Box>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAssigmenttoDelete(teacherClassAssignmentData);
                }}
              >
                Delete this assignment
              </LoadingButton>
              {successSubmit ? (
                <Grid item mb={2} ml={3} mr={3} xs={12}>
                  <Alert severity="success">
                    Assignment successfully deleted!
                  </Alert>
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
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createAIFeedback,
  getStudentsAssignmentsById,
  patchAssigmentFeedbackAndMark,
} from "../utils/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Skeleton,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

const TeacherAssignmentFeedback = () => {
  const { assignment_id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [mark, setMark] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiButton, setAIbutton] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [waitingRes, setWaitingRes] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [markOutOf, setMarkOutOf] = useState("")
  useEffect(() => {
    getStudentsAssignmentsById(assignment_id)
      .then(({ assignment }) => {
        setAssignment(assignment);
        console.log("assignment ONE:", assignment)
        setMark(assignment.users_assignments_mark || "");
        setFeedback(assignment.users_assignments_feedback || "");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("🚀 ~ error loading assignment:", err);
        setIsLoading(false);
      });
  }, [assignment_id]);
  const handleSubmit = (e) => {
    console.log("clicked")
    e.preventDefault();
    setIsSubmitting(true);
    patchAssigmentFeedbackAndMark(assignment_id, mark, feedback)
      .then((updatedAssignment) => {
        console.log("updatedAssignment", updatedAssignment)
        setSuccessSubmit(true);
        setIsSubmitting(false);
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          users_assignments_feedback: updatedAssignment.feedback,
          users_assignments_mark: updatedAssignment.mark,
        }));
        console.log("assignment", assignment)
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        setIsSubmitting(false);
      });
  };

  const handleAIclick = (e) => {
    e.preventDefault();
    setAIbutton(true);
    console.log("clicked")
    console.log("assignment.users_assignments_work", assignment.users_assignments_work)
    console.log("assignment.users_assignments_submit_date", assignment.users_assignments_submit_date)

    if(assignment.users_assignments_work && assignment.users_assignments_submit_date){
      if(aiButton){
        setAIbutton(false);
        setWaitingRes(true);
        setDisabledBtn(true);
      }
      createAIFeedback(assignment.users_assignments_work, markOutOf).then((data)=> {
        console.log("data returned:", data)
        setDisabledBtn(true);
        setWaitingRes(false);
        setAIbutton(false);
        setMark(data.mark);
        setFeedback(data.feedback);
        console.log("mark", mark)
        console.log("feedback", feedback)
      })
    }
  }
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <Container sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Assignment Feedback
      </Typography>
      <Container component={Paper} sx={{ p: 3, mt: 2 }}>
        {isLoading ? (
          <>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="60%" />
          </>
        ) : (
          <Grid container spacing={3}>
            {assignment && (
              <>
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "100%",
                    }}
                  >
                    <CardContent sx={{ flex: "1" }}>
                      <Typography variant="h5" gutterBottom>
                        {assignment.assignment_title}
                      </Typography>
                      <Typography paragraph sx={{whiteSpace: "pre-line"}}>
                        <strong>Assignment Body:</strong>{" "}
                        {assignment.assignment_body}
                      </Typography>
                      <Typography paragraph>
                        <strong>Created At:</strong>{" "}
                        {formatDate(assignment.assignment_created_at)}
                      </Typography>
                      <Typography paragraph>
                        <strong>Due Date:</strong>{" "}
                        {formatDate(assignment.assignment_due_date)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    elevation={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "100%",
                    }}
                  >
                    <CardContent sx={{ flex: "1" }}>
                      <Typography variant="h6">Student Details:</Typography>
                      <Typography paragraph>
                        <strong>Name:</strong> {assignment.user_name}{" "}
                        {assignment.user_surname}
                      </Typography>
                      <Typography paragraph>
                        <strong>Email:</strong> {assignment.user_email}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    Students work
                  </Typography>

                  {assignment.users_assignments_submit_date && (
                    <Typography paragraph align="center">
                      Submitted on{" "}
                      {formatDate(assignment.users_assignments_submit_date)}
                    </Typography>
                  )}

                  {assignment.users_assignments_work ? (
                    <Typography paragraph align="center">
                      {assignment.users_assignments_work}
                    </Typography>
                  ) : (
                    <Typography paragraph align="center">
                      Work has not been submitted yet so can't be marked
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <form onSubmit={handleSubmit}>
                    {waitingRes ? 
                <TextField
                label="Mark"
                type="text"
                value={"AI mark will appear here"}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
              /> :
              <TextField
                      label="Mark"
                      type="text"
                      value={mark || ""}  // Ensure that mark is always a string
                      onChange={(e) => setMark(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />}
                    {waitingRes ? 
                <TextField
                label="MarkOutOf"
                type="text"
                value={"AI mark will appear here"}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
              /> :
              <TextField
                      label="Mark Out Of"
                      type="text"
                      value={markOutOf || ""}  // Ensure that mark is always a string
                      onChange={(e) => setMarkOutOf(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />}
                {waitingRes ? 
                <TextField
                label="Feedback"
                value={feedback || ""}  // Ensure that feedback is always a string
                onChange={(e) => setFeedback(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
              /> :
                  <TextField
                      label="Feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      multiline
                      rows={4}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{mt: 2, mr: 2}}
                >
                      Submit
                    </Button>
                    {successSubmit ? (
              <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="success">Assignment successfully marked!</Alert>
              </Grid>
              ) : ( 
              <></> 
              )}
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={disabledBtn}
                  onClick={handleAIclick}
                  sx={{mt: 2}}
                >
                  AI generate mark and feedback
                </Button>
              </form>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default TeacherAssignmentFeedback;

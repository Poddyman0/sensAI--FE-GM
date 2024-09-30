/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import {
  getAssignmentsByAssignmentId,
  patchStudentAssignmentByAssignmentId,
} from "../utils/api";
import FeedbackIcon from '@mui/icons-material/Feedback';

export function DisplayStudentAssignment({ user }) {
  const [studentAssignment, setStudentAssignment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [isSubmitError, setSubmitError] = useState(false);
  const [isError, setIsError] = useState(false);
  const { assignment_id } = useParams();

  useEffect(() => {
    setSuccessSubmit(false);
    setIsError(false);
    setIsLoading(true);
    if (user) {
      getAssignmentsByAssignmentId(user.id, assignment_id)
        .then(({ assignment }) => {
          setIsLoading(false);
          setStudentAssignment(assignment[0]);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [assignment_id, user]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    setSubmitError(false);
    if (studentAssignment.work) {
      patchStudentAssignmentByAssignmentId(user.id, assignment_id, {
        work: studentAssignment.work,
      })
        .then(({ assignment }) => {
          setSuccessSubmit(true);
          setStudentAssignment((currentAssignment) => {
            return { ...currentAssignment, ...assignment };
          });
        })
        .catch((err) => {
          setSuccessSubmit(false);
          setSubmitError(true);
          console.log(err);
        });

      setTimeout(() => {
        setSuccessSubmit(false);
      }, 2000);
    }
  };

  function handleOnChangeWork(event) {
    return setStudentAssignment((currentAssignment) => {
      const newAssignment = { ...currentAssignment };
      newAssignment.work = event.target.value;
      return newAssignment;
    });
  }
  if (isLoading) {
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

  if (isError) {
    return (
      <Grid item mb={2} ml={3} mr={3} xs={12}>
        <Alert severity="error">
          Whops, some error here... please reload the page!
        </Alert>
      </Grid>
    );
  }

  return (
    <>
      <Grid
        spacing={1}
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            {studentAssignment.title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center" sx={{whiteSpace: "pre-line", maxWidth: {xs: "90%", sm:"60%"}, mr: "auto", ml: "auto"}}>
            {studentAssignment.body}
          </Typography>
        </Grid>

        <form onSubmit={handleSubmitForm}>
          <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            p={3}
          >
            <Grid item>
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained">Start</Button>
            </Grid>
          </Grid>

          {successSubmit ? (
            <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="success">Work sent successfully!</Alert>
            </Grid>
          ) : (
            <></>
          )}

          {isSubmitError ? (
            <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="warning">Work not sent, retry!</Alert>
            </Grid>
          ) : (
            <></>
          )}

          <Grid item ml={3} mr={3} xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Answer"
              fullWidth={true}
              multiline
              rows={5}
              size="medium"
              value={studentAssignment.work ? studentAssignment.work : ""}
              onChange={handleOnChangeWork}
            />
          </Grid>
        </form>

        {studentAssignment.feedback ? (
          <>
          <Grid item mt={7}>
          <Divider>Feedback</Divider>
        </Grid>
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
              <Typography variant="subtitle1" align="center">
                Mark: {studentAssignment.mark}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" align="center">
                Feedback: {studentAssignment.feedback}
              </Typography>
            </Grid>
            </Grid>
            <Grid item>
            <Typography variant="subtitle1" component="div">
              <FeedbackIcon />
            </Typography>
          </Grid>
            </Grid>
            </Grid>
          </Paper>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}

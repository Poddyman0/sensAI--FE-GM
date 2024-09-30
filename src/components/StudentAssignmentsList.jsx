/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAssignmentByStudentId } from "../utils/api";
import { StudentAssignmentsCard } from "./StudentAssignmentsCard";
import { Alert, Grid, Skeleton, Typography } from "@mui/material";

export function StudentAssignmentsList({ user }) {
  const [studentAssignments, setStudentAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    if (user) {
      getAssignmentByStudentId(user.id)
        .then(({ assignments }) => {
          setIsLoading(false);
          setIsError(false);
          setStudentAssignment(assignments);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [user]);


  if (isError) {
    return (
      <Grid item mb={2} ml={3} mr={3} xs={12}>
        <Alert severity="error">
          Whops, some error here... please reload the page!
        </Alert>
      </Grid>
    );
  }

  return isLoading ? (
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
  ) : (
    <ul className="student-lesson-container">
      {studentAssignments.map((assignment) => {
        return (
          <li
            key={assignment.id}
          >
            <StudentAssignmentsCard assignmentData={assignment} />
          </li>
        );
      })}
    </ul>
  );
}

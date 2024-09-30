/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudentTeachersByStudentId } from "../utils/api";
import { Alert, Grid, Skeleton, Typography } from "@mui/material";
import { StudentTeachersCard } from "./StudentTeachersCard";

export function StudentTeachersListPage({ user }) {
  const [studentTeachers, setStudentTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    if (user) {
      getAllStudentTeachersByStudentId(user.id)
        .then(({ teachers }) => {
          setIsLoading(false);
          setIsError(false);
          setStudentTeachers(teachers);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [user]);

  function handleTeacherToChat(room_id) {
    localStorage.setItem("roomId", room_id);
    navigate(`/student/teachers/chat/${room_id}`);
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
    <>
      <ul className="student-lesson-container">
        {studentTeachers.map((teacher) => {
          return (
            <li
              key={teacher.id}
              onClick={() => {
                handleTeacherToChat(`${teacher.id}_${user.id}`);
              }}
            >
              <StudentTeachersCard teachersData={teacher} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

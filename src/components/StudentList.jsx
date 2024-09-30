/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { getStudentsByTeacherClass } from "../utils/api";
import { StudentCard } from "./StudentCard";
import { useState, useEffect } from "react";
import { Skeleton, Typography } from "@mui/material";

export const StudentList = ({ user }) => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { class_id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getStudentsByTeacherClass(user.id, class_id).then(({ students }) => {
        setLoading(false);
        setStudents(students);
      });
    }
  }, [user, class_id]);

  function handleStudentToChat(room_id) {
    localStorage.setItem("roomId", room_id);
    navigate(`/teachers/student/chat/${room_id}`);
  }

  return loading ? (
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
      <ul>
        {students.map((student) => {
          return (
            <li
              key={student.id}
              onClick={() => {
                handleStudentToChat(`${user.id}_${student.id}`);
              }}
            >
              <StudentCard student={student} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

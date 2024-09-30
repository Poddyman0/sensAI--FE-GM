import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssignmentsByTeacherIDAndClassID } from "../utils/api";
import { TeacherClassClassIDAssignmentsCard } from "./TeacherClassClassIDAssignmentCard";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

export default function TeacherClassClassIDAssignmentsList({ user }) {
  const [teacherClassAssignments, setTeacherClassAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { class_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getAssignmentsByTeacherIDAndClassID(user.id, class_id)
        .then(({ assignments }) => {
          setIsLoading(false);
          setTeacherClassAssignment(assignments);
          setError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(true);
        });
    }
  }, [user]);

  function handleAssignmentToCreate() {
    navigate(`/teacher/assignments/new`);
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul className="student-lesson-container">
      <Box mt={3}></Box>
      <Box display="flex" justifyContent="center">
        <Box width="33%">
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              handleAssignmentToCreate();
            }}
          >
            Create new assignment
          </LoadingButton>
        </Box>
      </Box>
      {teacherClassAssignments.map((assignment) => {
        return (
          <li key={assignment.id}>
            <TeacherClassClassIDAssignmentsCard
              teacherClassAssignmentData={assignment}
            />
          </li>
        );
      })}
    </ul>
  );
}

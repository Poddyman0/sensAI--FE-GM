import React, { useEffect, useState } from "react";
import { getAssignmentsByTeacherId } from "../utils/api";
import { TeacherAssignmentCard } from "./AssignmentTeacherCard.jsx";
import { useParams } from "react-router-dom";

export default function TeacherAssignmentsList({ user }) {
  const [teacherAssignments, setTeacherAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { assignment_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getAssignmentsByTeacherId(user.id, assignment_id)
        .then(({ assignments }) => {
          setIsLoading(false);
          setTeacherAssignment(assignments);
          setError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(true);
        });
    }
  }, [user]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul className="student-lesson-container">
      {teacherAssignments.map((assignment) => {
        return (
          <li key={assignment.id}>
            <TeacherAssignmentCard teacherAssignmentData={assignment} />
          </li>
        );
      })}
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonByTeacherAndClass } from "../utils/api";
import { TeacherLessonCard } from "./TeacherLessonCard";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

const TeacherLessonsClassList = ({ user }) => {
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const { class_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getLessonByTeacherAndClass(user.id, class_id).then(({ lessons }) => {
        setLoading(false);
        setLessons(lessons);
      });
    }
  }, [user]);

  function handleLessonToCreate() {
    navigate(`/teacher/lessons/new`);
  }

  return loading ? (
    <p>loading...</p>
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
              handleLessonToCreate();
            }}
          >
            Create new lesson
          </LoadingButton>
        </Box>
      </Box>
      {lessons.map((lesson) => {
        return (
          <div key={lesson.id}>
            <li>
              <TeacherLessonCard lessonData={lesson} />
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default TeacherLessonsClassList;

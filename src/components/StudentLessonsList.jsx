import { useState, useEffect } from "react";
import { StudentLessonsCard } from "./StudentLessonsCard";
import { getLessonsByStudentId } from "../utils/api";
import { Link } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";

export const StudentLessonsList = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getLessonsByStudentId(user.id).then(({ lessons }) => {
        setLoading(false);
        setLessons(lessons);
      });
    }
  }, [user]);

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
    <ul className="student-lesson-container">
      {lessons.map((lesson) => {
        return (
          <div key={lesson.id}>
            <Link to={`/student/lessons/${lesson.id}`}>
              <li>
                <StudentLessonsCard lessonData={lesson} />
              </li>
            </Link>
          </div>
        );
      })}
    </ul>
  );
};

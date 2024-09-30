import { useEffect, useState } from "react";
import { getLesson } from "../utils/api";
import { useParams } from "react-router-dom";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
  Skeleton,
} from "@mui/material";
import moment from "moment";

export const StudentSingleLessonList = () => {
  const [lesson, setLesson] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lesson_id } = useParams();

  useEffect(() => {
    getLesson(lesson_id).then(({ lessons }) => {
      setLesson(lessons);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Container>
      <Card>
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textDecoration: "underline" }}
          >
            {lesson.title}
          </Typography>
          <Typography gutterBottom sx={{ whiteSpace: "pre-line" }}>
            {lesson.body}
          </Typography>
          <Typography>
            Created at: {moment(lesson.created_at).format("LL")}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

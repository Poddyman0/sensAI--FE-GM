import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

export const ClassesList = () => {
  //const [classes, setClasses] = useState([])
  //const [isLoading, setIsLoading] = useState(true)

  const classes_list = [
    {
      id: 1,
      name: "red",
      age_group: "KS1",
      subject: "maths",
      created_at: "2013-01-17",
      exam_board: "AQA",
    },
    {
      id: 2,
      name: "blue",
      age_group: "KS2",
      subject: "science",
      created_at: "2020-09-20",
      exam_board: "WJEC",
    },
    {
      id: 3,
      name: "green",
      age_group: "KS3",
      subject: "english",
      created_at: "2005-01-22",
      exam_board: "OCR",
    },
    {
      id: 4,
      name: "orange",
      age_group: "KS4",
      subject: "art",
      created_at: "2003-07-04",
      exam_board: "EDUQAS",
    },
  ];

  return (
    <section>
      <>
        <Box sx={{ width: "100%" }}>
          <h2>Assignments</h2>
          <Stack spacing={2}>
            <ul>
              {classes_list.map((classes, index) => {
                return (
                  <li key={index}>
                    <p>Title: {classes.name}</p>
                    <p>Age Group: {classes.age_group}</p>
                    <hr />
                  </li>
                );
              })}
            </ul>
          </Stack>
        </Box>
      </>
    </section>
  );
};


import React, { useState, useEffect } from "react";
import { postAssignment, getClassesByTeacherID, createAIAssessment } from "../utils/api";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const TeacherAssignmentsNew = ({ user }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [unsuccessfullSubmit, setUnsuccessfullSubmit] = useState(false)
  const [aiButton, setAIbutton] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState("")
  const [selectedTextLength, setSelectedTextLength] = useState(100);
  const [assignmentSubject, setAssignmentSubject] = useState("");
  const [waitingRes, setWaitingRes] = useState(false);

  useEffect(() => {
    if (user) {
      getClassesByTeacherID(user.id)
        .then(({ classes }) => {
          setClasses(classes);
          if (classes.length > 0) setSelectedClass(classes[0].id);
        })
        .catch((err) => {
          console.log("Error Fetching Classes:", err);
          setLoading(false);
          setUnsuccessfullSubmit(true)
        });
    }
  }, [user]);

  useEffect(() => {
    if (selectedClass && user) {
      setLoading(false);
    }
  }, [selectedClass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && user.id && selectedClass) {
      setPosting(true);
      postAssignment(user.id, selectedClass, title, body, dueDate)
        .then((data) => {
          console.log("Assignment Posted:", data)
          setUnsuccessfullSubmit(false)
          setSuccessSubmit(true);
          setTimeout(() => {
            setSuccessSubmit(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Error Posting Assignment:", err)
          setSuccessSubmit(false);
          setUnsuccessfullSubmit(true)
        })
        .finally(() => {
          setPosting(false);
        });
    } else {
      console.error("User ID or Selected Class ID not available");
      setUnsuccessfullSubmit(true)
      setSuccessSubmit(false);
    }
  };

  const handleAIClick = (e) => {
    e.preventDefault();
    if(aiButton){
      setAIbutton(false);
      setWaitingRes(true);
      createAIAssessment(assignmentSubject, selectedTextLength, selectedExamBoard)
      .then((data)=> {
        console.log("data", data)
        setWaitingRes(false);
        setBody(data);
      })
      return;
    }
    setAIbutton(true);
    setBody("");
  }

  const handleAIBack = (e) => {
    e.preventDefault();
    setAIbutton(false);
  }

  if (loading)
    return (
      <Container component="main" maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={118} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
        </Grid>
      </Container>
    );
  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Assignment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          {aiButton || waitingRes? 
          <Grid item xs={12}>
          <TextField
            fullWidth
            label="AI Response will appear here"
            value={body}
            required
            multiline
            rows={5}
            variant="outlined"
            disabled
          />
        </Grid> :
        <Grid item xs={12}>
        <TextField
          fullWidth
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          multiline
          rows={5}
          variant="outlined"
        />
      </Grid>}
      {aiButton ?
      <Grid item xs={12}>
      <TextField
        fullWidth
        label="Assignment Subject"
        value={assignmentSubject}
        onChange={(e) => setAssignmentSubject(e.target.value)}
        required
        multiline
        rows={5}
        variant="outlined"
      />
    </Grid> : null}
      {aiButton ? 
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="class-label"
                sx={{
                  backgroundColor: "white",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                Exam board
              </InputLabel>
              <Select
                labelId="class-label"
                value={selectedExamBoard}
                onChange={(e) => setSelectedExamBoard(e.target.value)}
                label="Class"
                required
              >
                  <MenuItem value={"OCR"}>
                    OCR
                  </MenuItem>
                  <MenuItem value={"EDUQAS"}>
                    EDUQAS
                  </MenuItem>
                  <MenuItem value={"AQA"}>
                    AQA
                  </MenuItem>
                  <MenuItem value={"WJEC"}>
                    WJEC
                  </MenuItem>
                  <MenuItem value={"EDEXCEL"}>
                    EDEXCEL
                  </MenuItem>
              </Select>
            </FormControl>
          </Grid> : null }
          {aiButton ? 
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="class-label"
                sx={{
                  backgroundColor: "white",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                Lesson Text Length
              </InputLabel>
              <Select
                labelId="class-label"
                value={selectedTextLength}
                onChange={(e) => setSelectedTextLength(e.target.value)}
                label="Class"
                required
              >
                  <MenuItem value={100}>
                    100
                  </MenuItem>
                  <MenuItem value={200}>
                    250
                  </MenuItem>
                  <MenuItem value={500}>
                    500
                  </MenuItem>
                  <MenuItem value={750}>
                    750
                  </MenuItem>
                  <MenuItem value={1000}>
                    1000
                  </MenuItem>
  
              </Select>
            </FormControl>
          </Grid> : null }
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="class-label"
                sx={{
                  backgroundColor: "white",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                Class
              </InputLabel>
              <Select
                labelId="class-label"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Class"
                required
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {!aiButton ? 
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={posting}
            >
              Post Assignment
            </LoadingButton>
            {successSubmit ? (
              <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="success">Lesson successfully posted!</Alert>
              </Grid>
              ) : (
              <></>
              )}
              {unsuccessfullSubmit ? (
              <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="success">Error: Error fetching classes, User ID not available, Class ID not available or error posting lesson</Alert>
              </Grid>
              ) : (
              <></>
              )}
              {waitingRes ? 
              <Grid item mb={2} ml={3} mr={3} xs={12}>
              <Alert severity="success">Waiting for AI response</Alert>
              </Grid> : null}
          </Grid>
          :
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAIBack}
            >
              Back
            </LoadingButton>
            </Grid>
}
          <Grid item xs={12} sx={{mb: 2}}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={posting}
              onClick={handleAIClick}
            >
              AI Generate Assignments
            </LoadingButton>
            </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TeacherAssignmentsNew;

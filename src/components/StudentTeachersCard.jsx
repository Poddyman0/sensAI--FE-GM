/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";

export const StudentTeachersCard = ({ teachersData }) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        mt: 5,
        cursor: "pointer",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h6">Teacher</Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                Name: {teachersData.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Email: {teachersData.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <ChatIcon fontSize="large" />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

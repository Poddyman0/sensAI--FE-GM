import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

export const ProfileCard = ({currentUser}) => {

    return (
        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        mt: 5,
        cursor: 'pointer',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      >
        <Box>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Update Your Name</FormHelperText>
        </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Surname</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">Update Your Surname</FormHelperText>
          </FormControl>
        </Box>
        <Box>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Update Your Email Address</FormHelperText>
        </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Disability</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">Update Your Disability</FormHelperText>
          </FormControl>
          </Box>
      </Paper>
      
    )

}
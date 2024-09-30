import { ProfileCard } from "./ProfileCard"
import * as React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Grid,
    Skeleton,
  } from "@mui/material";
import { useState, useEffect } from "react";
import { patchUser } from "../utils/api";
import SendIcon from '@mui/icons-material/Send';


export const ProfilePage = ({ user }) => {
    // console.log(user)
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [disability, setDisability] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (user) {
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setDisability(user.disability)
            setLoading(false);
        }
    },[user])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        patchUser(user.id, name, surname, email, disability)
            .then((user) => {
            setIsSubmitting(false);
            
          })
          .catch((err) => {
            console.log("🚀 ~ handleSubmit ~ err:", err);
            setIsSubmitting(false);
          });
    };
  
    const iconStyle = {
      fontSize: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    if (loading) {
        return (
          <Container component={Paper} sx={{ p: 2 }}>
            <Skeleton variant="box" width="100%" />
            <Skeleton variant="box" width="100%" />
            <Skeleton variant="box" width="100%" />
            <Skeleton variant="box" width="100%" />
          </Container>
        );
      }

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
        <AccountCircleIcon style={iconStyle} />
        <Typography style={{ fontSize: '12px' }}>Upload Profile Picture</Typography>
      </Box>
                <Box>
                <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                        />
                        <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                        />
                        <TextField
                  label="Disability"
                  value={disability || ""}
                  onChange={(e) => setDisability(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </form>
          </Box>
      </Paper>
      
    )
}
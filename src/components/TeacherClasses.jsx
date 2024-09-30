import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getClassesByTeacherID } from '../utils/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { TeacherClassesCard } from './TeacherClassesCard';

const TeacherClasses = ({ user }) => {
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getClassesByTeacherID(user.id).then(({ classes }) => {
        setLoading(false);
        setClasses(classes);
      });
    }
  }, [user]);

  return loading ? (
    <p>loading...</p>
  ) : (
      <>

        <Typography gutterBottom sx={{textAlign: "center"}} variant='h5'>
        Your classes:
        </Typography>
        {classes.map((classItem) => (
          <li key={classItem.id}><Link to={`/teacher/classes/${classItem.id}`}><TeacherClassesCard classItem={classItem}/></Link></li>
      ))}
    </>
  );
};

export default TeacherClasses;

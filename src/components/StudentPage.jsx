import { Container, Grid } from "@mui/material"
import { StudentList } from "./StudentList"
import { TeacherLessonsButton } from "./TeacherLessonsButton"
import { TeacherWorkButton } from "./TeacherWorkButton"



export const StudentPage = ({user}) => {

    return (
        <>
            <Grid container sx={{justifyContent: "center", textAlign: "center", flexDirection: {xs: "column", sm: "row" }, maxWidth: 550, mr: "auto", ml: "auto"}} >
                <Grid item xs={12} sm={5} sx={{mb: {xs: 2}}}>
            <TeacherWorkButton/>
                </Grid>
                <Grid item xs={12} sm={5}>
            <TeacherLessonsButton/>
                    
                </Grid>
            </Grid>
        <StudentList user={user}/>        
        </>
    )
}
import { Button } from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const TeacherWorkButton = () => {
    const { class_id } = useParams();
    return (
        <Link to={`/teacher/classes/${class_id}/assignments`}>
        <Button variant="contained" startIcon={<AssignmentIcon/>} sx={{mr: 2}}>
            Work Assigned
        </Button>
        </Link>
    )
    
}
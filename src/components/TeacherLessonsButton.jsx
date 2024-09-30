import { Button } from "@mui/material"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const TeacherLessonsButton = () => {
    const { class_id } = useParams();
    return (
        <Link to={`/teacher/lessons/${class_id}`}>
        <Button variant="contained" startIcon={<LocalLibraryIcon/>} sx={{ml: 2}}>
            Lessons Assigned
        </Button>
        </Link>
    )
    
}
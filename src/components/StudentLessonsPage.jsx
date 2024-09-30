import { StudentLessonsList } from "./StudentLessonsList"


export const StudentLessonsPage = ({user}) => {

    return (
        <>
        <StudentLessonsList user={user}/>
        </>
    )
}
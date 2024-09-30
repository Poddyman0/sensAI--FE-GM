/* eslint-disable react/prop-types */
import { StudentAssignmentsList } from "./StudentAssignmentsList";

export function StudentAssignmentsPage({ user }) {
  return (
    <>
      <StudentAssignmentsList user={user} />
    </>
  );
}

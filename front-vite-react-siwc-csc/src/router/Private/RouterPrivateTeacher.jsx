import { Navigate, Route } from "react-router-dom";
import Calendar from "../../components/teacher/Calendar/Calendar";
import Dashboard from "../../components/teacher/Dashboard/Dashboard";
import Ratings from "../../components/teacher/Ratings/Ratings";
import StudentList from "../../components/teacher/Students/StudentList";
import Task from "../../components/teacher/Task/Task";
import { RoutesWithNotFound } from "../Routers";

const RouterPrivateTeacher = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/teacher/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="list/students" element={<StudentList />} />
      {/* <Route path="subjects" element={<Subjects />} /> */}
      <Route path="task" element={<Task />} />
      <Route path="ratings" element={<Ratings />} />
      <Route path="calendar" element={<Calendar />} />
    </RoutesWithNotFound>
  );
};
export default RouterPrivateTeacher;

import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import RoleGuard from "../../Guards/RoleGuard";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Suspense } from "react";
import { StudentProvider } from "../../context/Student/StudentProvider";
import { TeacherProvider } from "../../context/Teacher/TeacherProvider";
import { RoutesWithNotFound } from "../Routers";

/* START LAZY COMPONENTS OF THE TEACHER ROUTE   */
const DashboardTeacher = lazy(() =>
  import("../../views/Teacher/DashboardTeacher")
);
const StudentList = lazy(() =>
  import("../../components/teacher/Students/StudentList")
);
const TaskTeacher = lazy(() => import("../../components/teacher/Task/Task"));
const RatingsTeacher = lazy(() =>
  import("../../components/teacher/Ratings/Ratings")
);
const Calendar = lazy(() =>
  import("../../components/teacher/Calendar/Calendar")
);

const Achievements = lazy(() =>
  import("../../components/teacher/Achievements/Achievements")
);
/* END LAZY COMPONENTS OF THE TEACHER ROUTE   */

/* START LAZY COMPONENTS OF THE STUDENT ROUTE   */
const DashboardStudent = lazy(() =>
  import("../../views/Student/DashboardStudent")
);
const Subjects = lazy(() =>
  import("../../components/student/Subjects/Subjects")
);
const TaskStudent = lazy(() => import("../../components/student/Tasks/Task"));
const RatingsStudent = lazy(() =>
  import("../../components/student/Ratings/Ratings")
);
/* END LAZY COMPONENTS OF THE STUDENT ROUTE   */

const SuspenseProgress = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Grid
          container
          justifyContent="center"
          component={Box}
          bgcolor="inherit"
        >
          <Grid
            item
            xs={11}
            m={2}
            mt={5}
            mb={1}
            container
            justifyContent="center"
            alignContent={"center"}
          >
            <CircularProgress color="primary" />
          </Grid>
        </Grid>
      }
    >
      {children}
    </Suspense>
  );
};

const RoutersPrivate = () => {
  const ssessionState = useSelector((store) => store.ssession);
  const { role } = ssessionState;
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={<Navigate to={`${role.split("_")[1]?.toLowerCase()}/`} />}
      />
      {/* ROUTER OF THE TEACHER ROLE */}
      <Route element={<RoleGuard rol={"ROLE_TEACHER"} />}>
        <Route
          path="/teacher/"
          element={
            <TeacherProvider>
              <DashboardTeacher />
            </TeacherProvider>
          }
        >
          <Route path="/teacher/" element={<Navigate to="list/students" />} />
          <Route
            path="list/students"
            element={
              <SuspenseProgress>
                <StudentList />
              </SuspenseProgress>
            }
          />
          <Route
            path="task"
            element={
              <SuspenseProgress>
                <TaskTeacher />
              </SuspenseProgress>
            }
          />
          <Route
            path="ratings"
            element={
              <SuspenseProgress>
                <RatingsTeacher />
              </SuspenseProgress>
            }
          />
          <Route
            path="achievements"
            element={
              <SuspenseProgress>
                <Achievements />
              </SuspenseProgress>
            }
          />
          <Route
            path="calendar"
            element={
              <SuspenseProgress>
                <Calendar />
              </SuspenseProgress>
            }
          />
        </Route>
      </Route>

      {/* ROUTER OF THE STUDENT ROLE */}
      <Route element={<RoleGuard rol={"ROLE_STUDENT"} />}>
        <Route
          path="/student/"
          element={
            <StudentProvider>
              <DashboardStudent />
            </StudentProvider>
          }
        >
          <Route path="/student/" element={<Navigate to="list/subjects" />} />
          <Route
            exact
            path="list/subjects"
            element={
              <SuspenseProgress>
                <Subjects />
              </SuspenseProgress>
            }
          />
          <Route
            exact
            path="list/tasks"
            element={
              <SuspenseProgress>
                <TaskStudent />
              </SuspenseProgress>
            }
          />
          <Route
            exact
            path="list/ratings"
            element={
              <SuspenseProgress>
                <RatingsStudent />
              </SuspenseProgress>
            }
          />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
};
export default RoutersPrivate;

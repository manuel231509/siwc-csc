import {
  Card as CardMui,
  CardContent,
  CardHeader,
  CircularProgress as CircularProgressMui,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../hooks/useFetchAndLoad1";
import { getPeriodsPlansByIdPeriodAndSubectAndDegree } from "../../../../../services/period plan/PeriodPlanService";
import TaskCard from "../task/TaskCard";
import AddTask from "./Add Task/AddTask";
import ModalDeliveredTask from "../task/Task Details/Accordion Details/Modal Delivered Task/ModalDeliveredTask";

const TasksCards = () => {
  const { select } = useTeacherContext();

  const {
    expandedAccordionSubjects,
    loading,
    periodsPlans,
    handleChangePeriodsPlans1,
  } = useTasksAssignedContext();

  const { callEndPoint } = useFetchAndLoad();

  const ssessionState = useSelector((store) => store.ssession);

  const { jwt, bearer, session } = ssessionState;

  const { teacher } = session;

  const getApiPeriodsPlansByIdPeriodAndSubectAndDegree = async (
    idPeriod,
    idSubject,
    idDegree,
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getPeriodsPlansByIdPeriodAndSubectAndDegree(
        idPeriod,
        idSubject,
        idDegree,
        idNumberTeacher,
        jwt,
        bearer
      ),
      "periods-plans"
    );

  useEffect(() => {
    console.log(
      select.periods,
      select.subjects.idSubject,
      select.grades,
      teacher.idNumberTeacher
    );
    // expandedAccordionSubjects === `panel-${select.subjects.idSubject}` &&
    getApiPeriodsPlansByIdPeriodAndSubectAndDegree(
      select.periods,
      select.subjects.idSubject,
      select.grades,
      teacher.idNumberTeacher,
      jwt,
      bearer
    )
      .then(({ data }) => {
        handleChangePeriodsPlans1({ value: data, error: "" });
      })
      .catch((error) =>
        handleChangePeriodsPlans1({
          value: [],
          error: error.response?.data?.message,
        })
      );
  }, [
    select.periods,
    select.subjects.idSubject,
    select.grades,
    periodsPlans.value.length,
  ]);

  return (
    <>
      <CardMui
        elevation={9}
        square
        sx={{ width: "100%", backgroundColor: "whitesmoke" }}
      >
        <CardHeader
          style={{ textAlign: "center" }}
          title={
            <Typography
              variant="subtitle2"
              fontWeight={700}
              letterSpacing=".17rem"
            >
              TASKS ASSIGNED
            </Typography>
          }
        />
        <CardContent>
          <AddTask />
          {!loading["periods-plans"] ? (
            !periodsPlans.error ? (
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={{ xs: 1, sm: 2, md: 5, lg: 4 }}
                  >
                    {periodsPlans.value.map((periodPlan, index) => (
                      <TaskCard key={index} periodPlan={periodPlan} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid container mt={3} justifyContent="center">
                <Typography
                  variant="subtitle"
                  fontWeight={700}
                  textAlign="center"
                >
                  {periodsPlans.error}
                </Typography>
              </Grid>
            )
          ) : (
            <CircularProgress /* value={progress} */ disableShrink />
          )}
        </CardContent>
      </CardMui>
      
    </>
  );
};

const CircularProgress = (props) => {
  return (
    <Grid container mt={3} justifyContent="center">
      <CircularProgressMui {...props} />
    </Grid>
  );
};
export default TasksCards;

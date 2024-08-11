import {
  CardContent,
  CardHeader,
  Card as CardMui,
  CircularProgress as CircularProgressMui,
  Grid,
  Typography,
} from "@mui/material";
import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../hooks/useFetchAndLoad1";
import { getPeriodsPlansByIdPeriodAndSubectAndDegree } from "../../../../../services/period plan/PeriodPlanService";
import { SuspenseProgress } from "../../../../SuspenseProgress/SusProg";

const AddTask = lazy(() => import("./Add Task/AddTask"));
const TaskCard = lazy(() => import("../task/TaskCard"));

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
    const fetchData = async () => {
      try {
        const { data: PeriodsPlanByIdPeriodAndSubjectAndDegree } =
          await getApiPeriodsPlansByIdPeriodAndSubectAndDegree(
            select.periods,
            select.subjects.idSubject,
            select.grades,
            teacher.idNumberTeacher,
            jwt,
            bearer
          );
        handleChangePeriodsPlans1({
          value: PeriodsPlanByIdPeriodAndSubjectAndDegree,
          error: "",
        });

        console.log(
          PeriodsPlanByIdPeriodAndSubjectAndDegree,
          select.periods,
          select.subjects.idSubject,
          select.grades
        );
      } catch (error) {
        handleChangePeriodsPlans1({
          value: [],
          error: error.response?.data?.message,
        });
      }
    };
    fetchData();
  }, [
    select.periods,
    select.subjects.idSubject,
    select.grades,
    teacher.idNumberTeacher,
    jwt,
    bearer,
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
                <SuspenseProgress>
                  <Grid item xs={12}>
                    <Grid
                      container
                      justifyContent="left"
                      spacing={{ xs: 1, sm: 2, md: 5, lg: 4 }}
                    >
                      {periodsPlans.value.map((periodPlan, index) => (
                        <TaskCard key={index} periodPlan={periodPlan} />
                      ))}
                    </Grid>
                  </Grid>
                </SuspenseProgress>
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
            <CircularProgress disableShrink />
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

import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../context/Tasks/TasksProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad3";
import { getStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher } from "../../../../services/student/StudentService";
import { getTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher } from "../../../../services/task/TaskService";

const ColumnGroupingTable = lazy(() =>
  import("./Table Tasks Ratings/ColumnGroupingTable")
);

const CircularProgressWithLabel = (props) => {
  return (
    <Box
      sx={{
        padding: 2,
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
};

const PaperTasksRatings = () => {
  const {
    select,
    handleChangeStudents2,
    handleChangeTasks2,
    loading: gLoading,
  } = useTasksAssignedContext();
  const { loading, callEndPoint } = useFetchAndLoad();

  const {
    jwt,
    bearer,
    session: { teacher: tch },
  } = useSelector((store) => store.ssession);

  const getApiStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher =
    async (idPeriod, idDegree, idSubject, idNumberTeacher, jwt, bearer) =>
      await callEndPoint(
        getStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
          idPeriod,
          idDegree,
          idSubject,
          idNumberTeacher,
          jwt,
          bearer
        ),
        "subjectsByPeriodAndDegreeAndSubjectAndTeacher",
        "localeSubjectsByPeriodAndDegreeAndSubjectAndTeacher"
      );

  const getApiTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher = async (
    idPeriod,
    idDegree,
    idSubject,
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
        idPeriod,
        idDegree,
        idSubject,
        idNumberTeacher,
        jwt,
        bearer
      ),
      "tasksByPeriodAndDegreeAndSubjectAndTeacher",
      "localeTasksByPeriodAndDegreeAndSubjectAndTeacher"
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dataStudents } =
          await getApiStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
            select.periods,
            select.grades,
            select.subjects,
            tch.idNumberTeacher,
            jwt,
            bearer
          );
        handleChangeStudents2({ ["data"]: dataStudents, ["error"]: {} });
      } catch (error) {
        handleChangeStudents2({ data: [], error: error.response });
      }

      try {
        const { data: dataTasks } =
          await getApiTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
            select.periods,
            select.grades,
            select.subjects,
            tch.idNumberTeacher,
            jwt,
            bearer
          );

        handleChangeTasks2({ data: dataTasks, error: {} });
      } catch (error) {
        handleChangeTasks2({ data: [], error: error.response });
      }
    };
    fetchData();
  }, [select]);

  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.secondary.sDeepOrange["300"]["light"]["value"],
        textAlign: "center",
        alignItems: "center",
        m: 1,
        p: 1,
      }}
    >
      {!gLoading["subjects_g"] &&
      select.periods &&
      !gLoading["degrees_g"] &&
      select.grades &&
      !gLoading["periodbydatenow_g"] &&
      !gLoading["tasks_ratings_periods_g"] &&
      !loading["localeSubjectsByPeriodAndDegreeAndSubjectAndTeacher"] &&
      !loading["localeTasksByPeriodAndDegreeAndSubjectAndTeacher"] ? (
        <ColumnGroupingTable />
      ) : (
        <CircularProgressWithLabel /* value={progress} */ disableShrink />
      )}
    </Grid>
  );
};

export default PaperTasksRatings;

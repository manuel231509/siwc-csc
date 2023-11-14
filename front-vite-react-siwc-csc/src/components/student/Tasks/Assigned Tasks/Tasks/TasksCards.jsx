import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";
import useFetchAndLoad from "../../../../../hooks/useFetchAndLoad2";
import { getTasksByIdNumberStudentAndIdSubjectAndCurrentDate } from "../../../../../services/task/TaskService";
import TaskCard from "../Task/TaskCard";

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

const TasksCards = () => {
  const { tasks, handleChangeTasks, select, loading } = useStudentContext();

  const { callEndPoint } = useFetchAndLoad();

  const { session, jwt, bearer } = useSelector((store) => store.ssession);

  const { student } = session;

  const getApiTasksByIdNumberStudentAndIdSubjectAndCurrentDate = async (
    idNumberStudent,
    idSubject,
    boolLimit,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getTasksByIdNumberStudentAndIdSubjectAndCurrentDate(
        idNumberStudent,
        idSubject,
        boolLimit,
        jwt,
        bearer
      ),
      "tasks",
      `tasks_${idSubject}`
    );

  useEffect(() => {
    getApiTasksByIdNumberStudentAndIdSubjectAndCurrentDate(
      student.idNumberStudent,
      select["subjects"].idSubject,
      false,
      jwt,
      bearer
    )
      .then(({ data }) => {
        console.log("data task: ", data);
        handleChangeTasks({
          ...tasks,
          ["value"]: {
            ...tasks["value"],
            [`${select["subjects"].idSubject}`]: data,
          },
          ["error"]: {
            ...tasks["error"],
            [`${select["subjects"].idSubject}`]: "",
          },
        });
      })
      .catch((error) => {
        console.log("error _> ", error);
        handleChangeTasks({
          ...tasks,
          ["value"]: {
            ...tasks["value"],
            [`${select["subjects"].idSubject}`]: [],
          },
          ["error"]: {
            ...tasks["error"],
            [`${select["subjects"].idSubject}`]: error.response?.data?.message,
          },
        });
      });
  }, [student.idNumberStudent, select["subjects"].idSubject, jwt]);

  return (
    <Grid
      sx={{ flexGrow: 1 }}
      container
      justifyContent={"center"}
      alignItems={"center"}
      {...(tasks["error"][`${select["subjects"].idSubject}`] && { p: 2 })}
    >
      {/* <pre>{JSON.stringify(select, null, 2)}</pre> */}
      {loading[`tasks_${select["subjects"].idSubject}`] && (
        <CircularProgressWithLabel /* value={progress} */ disableShrink />
      )}
      {!tasks["error"][`${select["subjects"].idSubject}`] &&
        !loading[`tasks_${select["subjects"].idSubject}`] && (
          <Grid item xs={12} pt={3} pb={2}>
            <Grid
              container
              justifyContent="center"
              alignContent={"center"}
              alignItems={"center"}
              spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
            >
              {tasks["value"][`${select["subjects"].idSubject}`]?.map(
                (task, index) => (
                  <TaskCard key={index} task={task} />
                )
              )}
            </Grid>
          </Grid>
        )}
      {!loading[`tasks_${select["subjects"].idSubject}`] &&
        tasks["error"][`${select["subjects"].idSubject}`] && (
          <Typography
            variant="subtitle3"
            fontWeight={700}
            letterSpacing="0.15rem"
          >
            {tasks["error"][`${select["subjects"].idSubject}`]}
          </Typography>
        )}
    </Grid>
  );
};

export default TasksCards;

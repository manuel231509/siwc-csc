import React from "react";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad2";
import { useSelector } from "react-redux";
import { getTasksByIdNumberStudentAndIdSubjectAndCurrentDate } from "../../../../services/task/TaskService";
import { useEffect } from "react";
import { useStudentContext } from "../../../../context/Student/StudentProvider";
import TaskDetailsAccordion from "./Task Details/TaskDetailsAccordion";
import { Grid, Typography } from "@mui/material";

const TaskCard = ({ subject }) => {
  const { callEndPoint } = useFetchAndLoad();

  const { tasks, handleChangeTasks } = useStudentContext();

  const ssessionState = useSelector((store) => store.ssession);
  const { jwt, bearer, session } = ssessionState;
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
      subject.idSubject,
      true,
      jwt,
      bearer
    )
      .then(({ data }) => {
        console.log("data task: ", data);
        handleChangeTasks({
          ...tasks,
          ["value"]: { ...tasks["value"], [`${subject.idSubject}`]: data },
          ["error"]: { ...tasks["error"], [`${subject.idSubject}`]: "" },
        });
      })
      .catch((error) => {
        console.log("error _> ", error);
        handleChangeTasks({
          ...tasks,
          ["value"]: { ...tasks["value"], [`${subject.idSubject}`]: [] },
          ["error"]: {
            ...tasks["error"],
            [`${subject.idSubject}`]: error.response?.data?.message,
          },
        });
      });
  }, [student.idNumberStudent, subject.idSubject, jwt]);
  
  return (
    <Grid p={1} height={"100%"}>
      {tasks["value"][`${subject.idSubject}`]?.map((task, index) => (
        <TaskDetailsAccordion key={index} task={task} />
      ))}
      {tasks["error"][`${subject.idSubject}`] && (
        <Typography
          variant="subtitle3"
          fontWeight={700}
          letterSpacing="0.15rem"
        >
          {tasks["error"][`${subject.idSubject}`]}
        </Typography>
      )}
    </Grid>
  );
};

export default TaskCard;

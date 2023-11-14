import { Box, CircularProgress, Fade, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../../../../context/Tasks/TasksProvider";
import useFetchAndLoad from "../../../../../../../../../hooks/useFetchAndLoad3";
import useWindowSize from "../../../../../../../../../hooks/useWindowSize";
import { getStudentsByIdNumberTeacherAndIdTask } from "../../../../../../../../../services/student/StudentService";
import {
  IconButtonCloseStyled,
  IconCloseStyled,
} from "./Styled/CardHeaderStyled";
import DeliveredTaskDetailsAccordion from "./Delivered Task Details/DeliveredTaskDetailsAccordion";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 26,
};

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

const FadeDeliveredTask = () => {
  const theme = useTheme();

  const pTeal = theme.palette.primary;

  const { height } = useWindowSize();

  const {
    jwt,
    bearer,
    session: { teacher },
  } = useSelector((store) => store.ssession);

  const {
    openModalDeliveredTask,
    handleChangeCloseModalDeliveredTask,
    select,
  } = useTasksAssignedContext();

  const { loading, callEndPoint } = useFetchAndLoad();

  const [students, setStudents] = useState({ value: [], error: "" });
  const hanldeChangeStudents = (nameField, valueField) => {
    setStudents({ ...students, [nameField]: valueField });
  };
  const hanldeChangeStudents1 = (value) => {
    setStudents((prevState) => ({ ...prevState, ...value }));
  };

  const getApiStudentsByIdNumberTeacherAndIdTask = async (
    idNumberTeacher,
    idTask,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getStudentsByIdNumberTeacherAndIdTask(
        idNumberTeacher,
        idTask,
        jwt,
        bearer
      ),
      "",
      "deliveredTaskByStudents"
    );

  useEffect(() => {
    console.log("task", select);
    getApiStudentsByIdNumberTeacherAndIdTask(
      teacher.idNumberTeacher,
      select.task?.idTask,
      jwt,
      bearer
    )
      .then(({ data }) => {
        console.log("data -> ", data.flat(2));
        const dataAux = [...data];

        dataAux.map(
          (student) =>
            (student.publishedTaskEntitys = student.publishedTaskEntitys.filter(
              (publishedTask) =>
                Boolean(publishedTask.taskDelivered) === true &&
                Boolean(publishedTask.dateTaskDelivered) === true &&
                publishedTask.idTask === select.task.idTask &&
                Boolean(publishedTask.qualifiedTask) !== true
            ))
        );
        console.log("data .< ", dataAux);
        hanldeChangeStudents1({ value: dataAux, error: "" });
      })
      .catch((error) => {
        console.log("erorr -> ", error);
        hanldeChangeStudents1({
          value: [],
          error: error.response?.data?.message,
        });
      });
  }, []);

  return (
    <Fade in={openModalDeliveredTask}>
      <Box sx={styleBox}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          sx={{
            flexGrow: 1,
            p: 0.9,
            borderBottom: "2.9px solid #000000",
            boxShadow: 10,
          }}
          bgcolor={pTeal["main"]}
        >
          <Grid item xs={10.5} sx={{ flexGrow: 1 }}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h4"
              textAlign="center"
              fontWeight={700}
              letterSpacing={{ xs: ".2rem" }}
              color={pTeal["contrastTextMain"]}
              fontSize={{ xs: ".7rem", sm: ".9rem", md: "auto" }}
            >
              DELIVERED TASKS
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h4"
              textAlign="center"
              fontWeight={600}
              letterSpacing={{ xs: ".2rem" }}
              color={pTeal["contrastTextMain"]}
              fontSize={{ xs: ".6rem", sm: "0.8rem", md: "1.0rem" }}
            >
              ({select.task.taskName.toLocaleUpperCase()})
            </Typography>
          </Grid>
          <Grid item xs={1.5} container justifyContent="end">
            <IconButtonCloseStyled
              onClick={handleChangeCloseModalDeliveredTask}
              sx={{ color: pTeal["contrastTextMain"] }}
            >
              {theme.direction !== "rtl" && <IconCloseStyled />}
            </IconButtonCloseStyled>
          </Grid>
        </Grid>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          sx={{
            flexGrow: 1,
            p: 1.7,
            width: { xs: "89.4vw", sm: "89.6vw", md: "81vw", lg: "82vw" },
            boxShadow: 15,
            maxWidth: "98vw",
            maxHeight:
              height < 400
                ? "68vh"
                : height >= 400 && height < 600
                ? "70vh"
                : height >= 600 && height < 900
                ? "85vh"
                : "90vh",
            overflowY: "auto",
          }}
        >
          <Grid container justifyContent={"center"}>
            {loading["deliveredTaskByStudents"] && (
              <CircularProgressWithLabel /* value={progress} */ disableShrink />
            )}
            {students.error &&
              !loading["deliveredTaskByStudents"] &&
              students.error}

            {students.value &&
              !students.error &&
              !loading["deliveredTaskByStudents"] &&
              students.value.filter(
                (student) => student.publishedTaskEntitys.length <= 0
              ).length > 0 &&
              "NO STUDENTS WERE FOUND TO QUALIFY."}
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            columnGap={1.5}
            rowGap={1.2}
            bgcolor="whitesmoke"
          >
            {students.value &&
              !students.error &&
              !loading["deliveredTaskByStudents"] &&
              students.value.map(
                (student, index) =>
                  student.publishedTaskEntitys.length > 0 && (
                    <Grid key={index} item md>
                      <DeliveredTaskDetailsAccordion
                        key={index}
                        deliveredTaskStudent={student}
                        index={index}
                      />
                    </Grid>
                  )
              )}
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default forwardRef(FadeDeliveredTask);

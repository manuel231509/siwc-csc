import { Close } from "@mui/icons-material";
import { Box, Fade, Grid, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../../../../hooks/useFetchAndLoad1";
import useWindowSize from "../../../../../../../../hooks/useWindowSize";
import { getByIdDegree } from "../../../../../../../../services/degrees/DegreesService";
import { IconButtonCloseStyled } from "../../../../task/Task Details/Accordion Details/Modal Delivered Task/Fade Delivered Task/Styled/CardHeaderStyled";
import { GridContainerFadeAddTask } from "./Styled/FadeAddTaskStyled";

const FormAddTask = lazy(() => import("./Form Add Task/FormAddTask"));

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 26,
};

const FadeAddTask = () => {
  const theme = useTheme();

  const { height, width } = useWindowSize();

  const { openModalAddTask, handleChangeCloseModalAddTask, loading } =
    useTasksAssignedContext();

  const { select, handleChangeSelect } = useTeacherContext();

  const { callEndPoint } = useFetchAndLoad();

  const ssessionState = useSelector((store) => store.ssession);

  const handleChangeDegree = (nameObject, value) => {
    setDegree({ ...degree, [nameObject]: value });
  };

  const { jwt, bearer } = ssessionState;

  const getApiDegreeById = async (idDegree, jwt, bearer) =>
    await callEndPoint(getByIdDegree(idDegree, jwt, bearer), "degree");

  useEffect(() => {
    getApiDegreeById(select.grades, jwt, bearer)
      .then(({ data }) => {
        handleChangeSelect("degree", data);
      })
      .catch((error) => console.log("error -> ", error));
  }, []);

  return (
    <Fade in={openModalAddTask}>
      <Box sx={styleBox}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-around"}
          alignItems="center"
          sx={{
            flexGrow: 1,
            p: 0.9,
            // width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
          }}
          bgcolor={(theme) => theme.palette.primary["main"]}
          boxShadow={20}
        >
          <Grid item xs sx={{ flexGrow: 1 }}>
            <Grid
              container
              justifyContent="center"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeate(2,1fr)",
                gap: 1,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                component={"h4"}
                textAlign="center"
                fontWeight={700}
                letterSpacing={".2rem"}
                color={(theme) => theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                }}
              >
                {!loading["degree"] ? (
                  `ADD TASK (${select?.degree?.nameDegree})`
                ) : (
                  <Skeleton width="200px" height="30px" animation="wave" />
                )}
              </Typography>
              <Typography
                variant="subtitle4"
                fontWeight={700}
                textAlign="center"
                letterSpacing=".2rem"
                color={theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                }}
              >
                {!loading["degree"] ? (
                  select.subjects?.nameSubject?.toLocaleUpperCase()
                ) : (
                  <Skeleton width="200px" height="30px" animation="wave" />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={0.7} container justifyContent="end">
            <IconButtonCloseStyled onClick={handleChangeCloseModalAddTask}>
              {theme.direction !== "rtl" && <Close />}
            </IconButtonCloseStyled>
          </Grid>
        </Grid>
        <GridContainerFadeAddTask height={height}>
          <FormAddTask />
        </GridContainerFadeAddTask>
      </Box>
    </Fade>
  );
};
export default forwardRef(FadeAddTask);

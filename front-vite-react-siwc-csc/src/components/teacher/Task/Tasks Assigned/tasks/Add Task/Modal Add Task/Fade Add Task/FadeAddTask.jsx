import { Close } from "@mui/icons-material";
import { Box, Fade, Grid, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../../../../hooks/useFetchAndLoad1";
import useWindowSize from "../../../../../../../../hooks/useWindowSize";
import { getByIdDegree } from "../../../../../../../../services/degrees/DegreesService";
import { IconButtonCloseStyled } from "../../../../task/Task Details/Accordion Details/Modal Delivered Task/Fade Delivered Task/Styled/CardHeaderStyled";
import FormAddTask from "./Form Add Task/FormAddTask";

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

  const pTeal = theme.palette.primary;

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
            width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
            borderBottom: "2.9px solid #000000",
            boxShadow: 10,
          }}
          bgcolor={pTeal["main"]}
        >
          <Grid item xs={10.5} sx={{ flexGrow: 1 }}>
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
                color={theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                  md: "1.1rem",
                }}
              >
                {!loading["degree"] ? (
                  <>ADD TASK ({select?.degree?.nameDegree})</>
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
                  md: "1.1rem",
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
          <Grid item xs={1.5} container justifyContent="end">
            <IconButtonCloseStyled
              onClick={handleChangeCloseModalAddTask}
              sx={{ color: pTeal["contrastTextMain"] }}
            >
              {theme.direction !== "rtl" && <Close />}
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
            width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
            ...(height > 0 && height < 400 && { height: "65vh" }),
            ...(height > 400 && height <= 600 && { height: "75vh" }),
            borderBottom: "2.9px solid #000000",
            boxShadow: 10,
            maxWidth: "98vw",
            maxHeight: "83vh",
            overflowY: "auto",
          }}
          bgcolor="background.paper"
        >
          <FormAddTask />
        </Grid>
      </Box>
    </Fade>
  );
};
export default forwardRef(FadeAddTask);

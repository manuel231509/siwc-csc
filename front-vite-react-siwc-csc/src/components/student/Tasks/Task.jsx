import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import TasksAssigned from "./Assigned Tasks/TasksAssigned";
import { useSelector } from "react-redux";
import { useState } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { getByIdDegree } from "../../../services/degrees/DegreesService";
import { useEffect } from "react";
import { useStudentContext } from "../../../context/Student/StudentProvider";
import { saveLocalStorageEncrypted } from "../../../LocalStorage/LocalStorage";

const Task = () => {
  const theme = useTheme();
  const tGreen50 = theme.palette.tertiary.tGreen50;
  const pTeal800 = theme.palette.primary.pTeal800;

  const ssessionState = useSelector((store) => store.ssession);

  const { session, jwt, bearer } = ssessionState;

  const [degree, setDegree] = useState({});

  const { loading, callEndPoint } = useFetchAndLoad();

  const getApiIdDegree = async (idDegree, jwt, bearer) =>
    await callEndPoint(getByIdDegree(idDegree, jwt, bearer));

  const { handleChangeSelect1, select } = useStudentContext();

  useEffect(() => {
    getApiIdDegree(session.student.idDegree, jwt, bearer)
      .then(({ data }) => {
        setDegree(data);
        saveLocalStorageEncrypted("task-degree", data);
      })
      .catch((error) => console.log("error -> ", error));
  }, [ssessionState]);

  useEffect(() => {
    if (degree) {
      delete degree.studentEntitys;
      delete degree.degreeSubjectEntitys;
      handleChangeSelect1({ ...select, ["degree"]: { ...degree } });
    }
  }, [degree]);

  return (
    <Grid container justifyContent="center" component={Box} bgcolor="inherit">
      <Grid
        item
        xs={11}
        m={2}
        mt={5}
        container
        justifyContent="center"
        alignContent="center"
      >
        <Typography
          variant="h5"
          color={tGreen50["contrastTextLight"]}
          fontWeight={800}
          letterSpacing={".75rem"}
        >
          TASKS
        </Typography>
      </Grid>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          container
          mt={5}
          mb={1.5}
          p={2}
          pl={5}
          pr={5}
          justifyContent={"center"}
          alignContent={"center"}
          width={"auto"}
          bgcolor={pTeal800["light"]}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            letterSpacing={".17rem"}
          >
            {!loading ? (
              degree.nameDegree
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                width={120}
                height={35}
              />
            )}
          </Typography>
        </Grid>
        <TasksAssigned />
      </Grid>
    </Grid>
  );
};

export default Task;

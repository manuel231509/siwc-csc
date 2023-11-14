import { Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import TasksCards from "../Tasks/TasksCards";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";

const PaperTask = () => {
  const theme = useTheme();
  const { select } = useStudentContext();
  const sDeepOrange = theme.palette.secondary.sDeepOrange;
  return select["subjects"] ? (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        backgroundColor: sDeepOrange["300"]["light"]["value"],
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
      }}
    >
      <TasksCards />
    </Grid>
  ) : null;
};

export default PaperTask;

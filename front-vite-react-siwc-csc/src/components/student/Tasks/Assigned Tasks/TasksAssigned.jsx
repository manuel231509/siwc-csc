import { Grid } from "@mui/material";
import React from "react";
import FormSubjects from "./Form Subjects/FormSubjects";
import PaperTask from "./Paper Task/PaperTask";

const TasksAssigned = () => {
  return (
    <Grid container mt={1} mb={1} justifyContent={"center"}>
      <Grid item xs={11.8} alignContent={"center"} alignSelf={"center"}>
        <FormSubjects />
        <PaperTask />
      </Grid>
    </Grid>
  );
};

export default TasksAssigned;

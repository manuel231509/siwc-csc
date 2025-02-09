import { Grid } from "@mui/material";
import { lazy } from "react";
const AccordionsSubjects = lazy(() =>
  import("./tasks/Accordion Subjects/AccordionsSubjects")
);

const TasksAssigned = () => {
  return (
    <Grid container mt={1} mb={1} justifyContent="center">
      <Grid item xs={11.8} alignContent="center" alignSelf="center">
        <AccordionsSubjects />
      </Grid>
    </Grid>
  );
};
export default TasksAssigned;

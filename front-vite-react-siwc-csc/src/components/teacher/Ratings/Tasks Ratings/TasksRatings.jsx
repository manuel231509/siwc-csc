import { Grid } from "@mui/material";
import { lazy } from "react";
import { useTasksAssignedContext } from "../../../../context/Tasks/TasksProvider";

const FormRatings = lazy(() => import("../Form Ratings/FormRatings"));
const PaperTasksRatings = lazy(() =>
  import("../Paper Tasks Ratings/PaperTasksRatings")
);

const TasksRatings = () => {
  const { loading, select } = useTasksAssignedContext();
  return (
    <Grid container mt={1} mb={1} justifyContent="center">
      <Grid item xs={11.8} alignContent="center" alignSelf="center">
        <FormRatings />
        {!loading["subjects_g"] &&
          select.periods &&
          !loading["degrees_g"] &&
          select.grades &&
          !loading["periodbydatenow_g"] &&
          !loading["tasks_ratings_periods_g"] &&
          select.subjects && <PaperTasksRatings />}
      </Grid>
    </Grid>
  );
};

export default TasksRatings;

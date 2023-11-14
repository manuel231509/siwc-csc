import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme as theme } from "@mui/material/styles";
import { TasksAssignedProvider } from "../../../context/Tasks/TasksProvider";
import TasksAssigned from "./Tasks Assigned/TasksAssigned";

const Task = () => {
  const tGreen50 = theme().palette.tertiary.tGreen50;
  return (
    <Grid container justifyContent="center" component={Box} bgcolor="inherit">
      <Grid
        item
        xs={11}
        m={2}
        mt={5}
        container
        justifyContent="center"
        alignContent={"center"}
      >
        <Typography
          variant="h5"
          color={tGreen50["contrastTextLight"]}
          fontWeight={800}
          letterSpacing={".75rem"}
        >
          TASK
          <Divider color="gray" />
        </Typography>
      </Grid>

      <Grid container sx={{ flexGrow: 1 }}>
        <TasksAssignedProvider>
          <TasksAssigned />
        </TasksAssignedProvider>
      </Grid>
    </Grid>
  );
};
export default Task;

import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lazy } from "react";
import { TasksAssignedProvider } from "../../../context/Tasks/TasksProvider";

const TasksRatings = lazy(() => import("./Tasks Ratings/TasksRatings"));

const Ratings = () => {
  const theme = useTheme();
  const tGreen50 = theme.palette.tertiary.tGreen50;
  return (
    <Grid container justifyContent="center" component={Box} bgcolor="inherit">
      <Grid
        item
        xs={11}
        m={2}
        mt={5}
        mb={1}
        container
        justifyContent="center"
        alignContent="center"
      >
        <Typography
          variant="h5"
          color={tGreen50["contrastTextLight"]}
          fontWeight={800}
          letterSpacing=".75rem"
        >
          RATINGS
          <Divider color="gray" />
        </Typography>
      </Grid>
      <Grid container sx={{ flexGrow: 1 }}>
        <TasksAssignedProvider>
          <TasksRatings />
        </TasksAssignedProvider>
      </Grid>
    </Grid>
  );
};
export default Ratings;

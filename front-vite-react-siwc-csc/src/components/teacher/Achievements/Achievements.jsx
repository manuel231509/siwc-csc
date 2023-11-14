import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lazy } from "react";
import { TeacherProvider } from "../../../context/Teacher/TeacherProvider";

const AssignAchievements = lazy(() =>
  import("../Achievements/Assign Achievements/AssignAchievements")
);

const Achievements = () => {
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
          ACHIEVEMENTS
          <Divider color="gray" />
        </Typography>
      </Grid>
      <Grid container sx={{ flexGrow: 1 }}>
        {/* <TeacherProvider> */}
        <AssignAchievements />
        {/* </TeacherProvider> */}
      </Grid>
    </Grid>
  );
};

export default Achievements;

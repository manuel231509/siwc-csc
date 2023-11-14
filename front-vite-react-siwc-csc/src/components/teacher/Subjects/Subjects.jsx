import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardsDegrees from "./Cards Degrees/CardsDegrees";

const Subjects = () => {
  const theme = useTheme();
  const tGreen50 = theme.palette.tertiary.tGreen50;
  const pTeal800 = theme.palette.primary.pTeal800;
  return (
    <Grid container justifyContent="center" component={Box} bgcolor="inherit">
      <Grid item xs={11} m={2} mt={5} mb={5} container justifyContent="center">
        <Typography
          variant="h5"
          color={tGreen50["contrastTextMain"]}
          fontWeight={800}
          letterSpacing={".75rem"}
        >
          SUBJECTS
          <Divider color="gray" />
        </Typography>
      </Grid>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          container
          mt={5}
          mb={5}
          p={2}
          pl={5}
          pr={5}
          justifyContent="center"
          alignItems="center"
          width="10rem"
          bgcolor={pTeal800["light"]}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            letterSpacing=".17rem"
          >
            DEGREES
          </Typography>
        </Grid>
        <CardsDegrees />
      </Grid>
    </Grid>
  );
};
export default Subjects;

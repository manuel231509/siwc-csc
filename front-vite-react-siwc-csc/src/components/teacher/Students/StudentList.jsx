import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme as theme } from "@mui/material/styles";
import AccordionsStudent from "./AccordionStudent/AccordionsStudent";

const StudentList = () => {
  const tGreen50 = theme().palette.tertiary.tGreen50;
  const pTeal800 = theme().palette.primary.pTeal800;

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
        alignContent={"center"}
      >
        <Typography
          variant="h5"
          color={tGreen50["contrastTextLight"]}
          fontWeight={800}
          letterSpacing={".75rem"}
        >
          STUDENTS
          <Divider color="gray" />
        </Typography>
      </Grid>
      <Grid container>
        <Grid
          container
          mt={5}
          mb={1.5}
          p={2}
          pl={5}
          pr={5}
          justifyContent={"center"}
          alignItems="center"
          width="10rem"
          bgcolor={pTeal800["light"]}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            letterSpacing={".17rem"}
          >
            SUBJECTS
          </Typography>
        </Grid>
        <AccordionsStudent />
      </Grid>
    </Grid>
  );
};
export default StudentList;

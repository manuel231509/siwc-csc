import { Grid, Paper } from "@mui/material";

const PaperAchievements = () => {
  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.secondary.sDeepOrange["300"]["light"]["value"],
        textAlign: "center",
        alignContent: "center",
        m: 1,
        p: 1,
      }}
    >
      <div>PaperAchievements</div>
    </Grid>
  );
};
export default PaperAchievements;
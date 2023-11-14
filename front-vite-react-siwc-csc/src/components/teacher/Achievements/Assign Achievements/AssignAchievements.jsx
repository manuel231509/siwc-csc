import { Grid } from "@mui/material";
import FormAchievements from "../Form Achievements/FormAchievements";
import PaperAchievements from "../Paper Achievements/PaperAchievements";

const AssignAchievements = () => {
  return (
    <Grid container mt={1} mb={1} justifyContent={"center"}>
      <Grid item xs={11.8} alignContent={"center"} alignSelf={"center"}>
        <FormAchievements />
        <PaperAchievements />
      </Grid>
    </Grid>
  );
};

export default AssignAchievements;

import { AddCircle } from "@mui/icons-material";
import { useTeacherContext } from "../../../../context/Teacher/TeacherProvider";
import { Grid, Button } from "@mui/material";

const AddAchievements = () => {
  const { handleChangeOpenModalAddAchievements } = useTeacherContext();
  return (
    <Grid container justifyContent="center" mb={3.5}>
      <Button
        variant="contained"
        onClick={handleChangeOpenModalAddAchievements}
        color="secondary"
        startIcon={<AddCircle />}
      >
        ADD ACHIEVEMENTS
      </Button>
    </Grid>
  );
};
export default AddAchievements;

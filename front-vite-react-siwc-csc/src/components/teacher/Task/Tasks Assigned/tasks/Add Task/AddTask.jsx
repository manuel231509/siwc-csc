import { AddCircle } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";

const AddTask = () => {
  const { handleChangeOpenModalAddTask } = useTasksAssignedContext();
  return (
    <>
      <Grid container justifyContent="center" mb={3.5}>
        <Button
          variant="contained"
          onClick={handleChangeOpenModalAddTask}
          color="secondary"
          startIcon={<AddCircle />}
        >
          ADD TASK
        </Button>
      </Grid>
    </>
  );
};
export default AddTask;

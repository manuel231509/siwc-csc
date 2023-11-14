import { Backdrop, Modal } from "@mui/material";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";
import FadeAddTask from "./Fade Add Task/FadeAddTask";

const ModalAddTask = () => {
  const { openModalAddTask, handleChangeCloseModalAddTask } =
    useTasksAssignedContext();
  return (
    <Modal
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-description"
      open={openModalAddTask}
      onClose={handleChangeCloseModalAddTask}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
    >
      <FadeAddTask />
    </Modal>
  );
};
export default ModalAddTask;

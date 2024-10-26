import { Backdrop, Modal } from "@mui/material";
import { lazy } from "react";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";
import { SuspenseProgressBackdrop } from "../../../../../../SuspenseProgress/SusProg";

const FadeAddTask = lazy(() => import("./Fade Add Task/FadeAddTask"));

const ModalAddTask = () => {
  const { openModalAddTask, handleChangeCloseModalAddTask } =
    useTasksAssignedContext();
  return (
    <Modal
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-title"
      open={openModalAddTask}
      onClose={handleChangeCloseModalAddTask}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotprops={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{ opacity: 1 }}
    >
      <SuspenseProgressBackdrop>
        <FadeAddTask />
      </SuspenseProgressBackdrop>
    </Modal>
  );
};
export default ModalAddTask;

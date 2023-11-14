import { Backdrop, Modal } from "@mui/material";
import React from "react";
import { useTasksAssignedContext } from "../../../../../../../../context/Tasks/TasksProvider";
import FadeDeliveredTask from "./Fade Delivered Task/FadeDeliveredTask";

const ModalDeliveredTask = () => {
  const { openModalDeliveredTask, handleChangeCloseModalDeliveredTask } =
    useTasksAssignedContext();
  return (
    <Modal
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-description"
      open={openModalDeliveredTask}
      onClose={handleChangeCloseModalDeliveredTask}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
    >
      <FadeDeliveredTask />
    </Modal>
  );
};

export default ModalDeliveredTask;

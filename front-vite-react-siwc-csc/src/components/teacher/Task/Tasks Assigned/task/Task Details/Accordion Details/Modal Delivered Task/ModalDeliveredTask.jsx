import { Backdrop, Modal } from "@mui/material";
import React, { lazy } from "react";
import { useTasksAssignedContext } from "../../../../../../../../context/Tasks/TasksProvider";
import { SuspenseProgressBackdrop } from "../../../../../../../SuspenseProgress/SusProg";

const FadeDeliveredTask = lazy(() =>
  import("./Fade Delivered Task/FadeDeliveredTask")
);

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
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <SuspenseProgressBackdrop>
        <FadeDeliveredTask />
      </SuspenseProgressBackdrop>
    </Modal>
  );
};

export default ModalDeliveredTask;

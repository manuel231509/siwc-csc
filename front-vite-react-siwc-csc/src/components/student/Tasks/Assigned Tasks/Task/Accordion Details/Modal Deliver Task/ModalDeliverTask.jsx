import { Backdrop, Modal } from "@mui/material";
import React from "react";
import { useStudentContext } from "../../../../../../../context/Student/StudentProvider";
import FadeDeliverTask from "./Fade Deliver Task/FadeDeliverTask";

const ModalDeliverTask = () => {

    const {openModalDeliverTask, handleChangeCloseModalDeliverTask} = useStudentContext();

  return (
    <Modal
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-description"
      open={openModalDeliverTask}
      onClose={handleChangeCloseModalDeliverTask}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
    >
        <FadeDeliverTask />
    </Modal>
  );
};

export default ModalDeliverTask;

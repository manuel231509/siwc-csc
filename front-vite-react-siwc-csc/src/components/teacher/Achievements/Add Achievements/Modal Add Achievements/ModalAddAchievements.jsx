import React from "react";
import { Backdrop, Modal } from "@mui/material";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";
import FadeAddAchievements from "./Fade Add Achievements/FadeAddAchievements";

const ModalAddAchievements = () => {
  const { openModalAddAchievements, handleChangeCloseModalAddAchievements } =
    useTeacherContext();
  return (
    <Modal
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-title"
      open={openModalAddAchievements}
      onClose={handleChangeCloseModalAddAchievements}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 400,
        },
      }}
    >
      <FadeAddAchievements />
    </Modal>
  );
};
export default ModalAddAchievements;

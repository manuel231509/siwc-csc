import React from "react";
import { useTasksAssignedContext } from "../../../../../../../../../../context/Tasks/TasksProvider";
import { useTheme } from "@emotion/react";
import { Accordion } from "@mui/material";
import DeliveredTaskAccordionSummary from "./Accordion Summary/DeliveredTaskAccordionSummary";
import DeliveredTaskAccordionDetails from "./Accordion Details/DeliveredTaskAccordionDetails";

const DeliveredTaskDetailsAccordion = ({ deliveredTaskStudent, index }) => {
  const theme = useTheme();
  const {
    expandedAccordionDeliveredTaskDetails,
    handleChangeExpandedAccordionDeliveredTask,
    handleChangeSelect2,
  } = useTasksAssignedContext();
  return (
    <Accordion
      key={index}
      expanded={
        expandedAccordionDeliveredTaskDetails ===
        `panel-${deliveredTaskStudent.idNumberStudent}`
      }
      onChange={handleChangeExpandedAccordionDeliveredTask(
        `panel-${deliveredTaskStudent.idNumberStudent}`
      )}
      onClick={handleChangeSelect2(
        "deliveredTaskStudent",
        deliveredTaskStudent
      )}
      elevation={7}
      sx={{
        "&:hover": {
          boxShadow: theme.shadows[9],
        },
      }}
    >
      <DeliveredTaskAccordionSummary
        deliveredTaskStudent={deliveredTaskStudent}
        index={index}
      />
      <DeliveredTaskAccordionDetails
        deliveredTaskStudent={deliveredTaskStudent}
      />
    </Accordion>
  );
};

export default DeliveredTaskDetailsAccordion;

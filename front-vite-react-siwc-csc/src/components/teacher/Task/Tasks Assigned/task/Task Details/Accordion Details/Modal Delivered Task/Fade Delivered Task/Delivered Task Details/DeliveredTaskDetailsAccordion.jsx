import { useTheme } from "@emotion/react";
import { Accordion } from "@mui/material";
import React, { lazy } from "react";
import { useTasksAssignedContext } from "../../../../../../../../../../context/Tasks/TasksProvider";

const DeliveredTaskAccordionSummary = lazy(() =>
  import("./Accordion Summary/DeliveredTaskAccordionSummary")
);

const DeliveredTaskAccordionDetails = lazy(() =>
  import("./Accordion Details/DeliveredTaskAccordionDetails")
);

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

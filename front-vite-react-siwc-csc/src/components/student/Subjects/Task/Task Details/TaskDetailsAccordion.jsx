import { Accordion } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";
import TaskDetailsAccordionSummary from "./Accordion Summary/TaskDetailsAccordionSummary";
import { useEffect } from "react";
import TaskDetailsAccordionDetails from "./Accordion Details/TaskDetailsAccordionDetails";

const TaskDetailsAccordion = ({ task }) => {
  const theme = useTheme();
  const {
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
  } = useStudentContext();

  return (
    <Accordion
      expanded={expandedAccordionTaskDetails === `panel-${task.idTask}`}
      onChange={handleChangeExpandedAccordionTaskDetails(
        `panel-${task.idTask}`
      )}
      elevation={5}
      sx={{
        mb: 1,
      }}
    >
      <TaskDetailsAccordionSummary task={task} />
      <TaskDetailsAccordionDetails task={task} />
    </Accordion>
  );
};

export default TaskDetailsAccordion;

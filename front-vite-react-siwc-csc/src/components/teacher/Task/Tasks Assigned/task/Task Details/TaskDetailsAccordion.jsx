import { Accordion } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import TaskDetailsAccordionDetails from "./Accordion Details/TaskDetailsAccordionDetails";
import TaskDetailsAccordionSummary from "./Accordion Summary/TaskDetailsAccordionSummary";

const TaskDetailsAccordion = ({ task }) => {
  const windowSize = useWindowSize();

  const {
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
  } = useTasksAssignedContext();

  const theme = useTheme();

  return (
    <Accordion
      key={task.idTask}
      expanded={expandedAccordionTaskDetails === `panel-${task.idTask}`}
      onChange={handleChangeExpandedAccordionTaskDetails(
        `panel-${task.idTask}`
      )}
      elevation={7}
      sx={{
        "&:hover": {
          boxShadow: theme.shadows[9],
        },
        mb: 2,
      }}
    >
      <TaskDetailsAccordionSummary windowSize={windowSize} task={task} />
      <TaskDetailsAccordionDetails windowSize={windowSize} task={task} />
    </Accordion>
  );
};
export default TaskDetailsAccordion;

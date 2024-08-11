import { Accordion, AccordionDetails, Box, Portal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lazy, useEffect, useRef, useState } from "react";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import { SuspenseProgress } from "../../../../../SuspenseProgress/SusProg";

const TaskDetailsAccordionDetails = lazy(() =>
  import("./Accordion Details/TaskDetailsAccordionDetails")
);
const TaskDetailsAccordionSummary = lazy(() =>
  import("./Accordion Summary/TaskDetailsAccordionSummary")
);

const TaskDetailsAccordion = ({ task }) => {
  const windowSize = useWindowSize();

  const {
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
  } = useTasksAssignedContext();

  const theme = useTheme();

  const summaryRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: "100%" });

  useEffect(() => {
    if (summaryRef.current) {
      const rect = summaryRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY, // Adjust for scrolling
        left: rect.left + window.scrollX, // Adjust for scrolling
        width: rect.width,
      });
    }
  }, [expandedAccordionTaskDetails]);

  const handleOpenDetails = (event) => {
    handleChangeExpandedAccordionTaskDetails(`panel-${task.idTask}`)(
      event,
      !Boolean(expandedAccordionTaskDetails)
    );
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Accordion
        key={task.idTask}
        expanded={expandedAccordionTaskDetails === `panel-${task.idTask}`}
        onChange={handleOpenDetails}
        elevation={7}
        sx={{
          width: "100%",
          "&:hover": {
            boxShadow: theme.shadows[9],
          },
        }}
      >
        <TaskDetailsAccordionSummary
          ref={summaryRef}
          windowSize={windowSize}
          task={task}
        />
      </Accordion>
      {expandedAccordionTaskDetails === `panel-${task.idTask}` && (
        <Portal>
          <Box
            sx={{
              position: "absolute",
              top: position.top + 16,
              left: position.left,
              width: position.width,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[9],
              zIndex: 1,
            }}
          >
            <AccordionDetails>
              <SuspenseProgress>
                <TaskDetailsAccordionDetails
                  windowSize={windowSize}
                  task={task}
                />
              </SuspenseProgress>
            </AccordionDetails>
          </Box>
        </Portal>
      )}
    </Box>
  );
};
export default TaskDetailsAccordion;

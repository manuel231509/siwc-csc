import { Accordion, AccordionDetails, Box, Portal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lazy, useEffect, useRef, useState } from "react";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import { SuspenseProgress } from "../../../../../SuspenseProgress/SusProg";
import { useTeacherContext } from "../../../../../../context/Teacher/TeacherProvider";

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
    expandedAccordionSubjects,
  } = useTasksAssignedContext();

  const { select } = useTeacherContext();

  const theme = useTheme();

  const summaryRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: "100%" });

  const updatePosition = (topadd) => {
    if (summaryRef.current) {
      // Forzar la recalculación del layout usando requestAnimationFrame
      requestAnimationFrame(() => {
        const rect = summaryRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + topadd, // Ajuste por el desplazamiento
          left: rect.left + window.scrollX, // Ajuste por el desplazamiento
          width: rect.width,
        });
      });
    }
  };

  useEffect(() => {
    updatePosition(20); // Actualiza la posición cuando se abre el acordeón
  }, [expandedAccordionTaskDetails]);

  useEffect(() => {
    updatePosition(5); // Actualiza la posición cuando se minimiza la ventana.
  }, [windowSize]);

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
        onChange={handleChangeExpandedAccordionTaskDetails(
          `panel-${task.idTask}`
        )}
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
        <SuspenseProgress>
          {expandedAccordionTaskDetails === `panel-${task.idTask}` && (
            <Portal>
              <Box
                sx={{
                  position: "absolute",
                  top: position.top,
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
        </SuspenseProgress>
      </Accordion>
    </Box>
  );
};
export default TaskDetailsAccordion;

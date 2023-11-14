import { Accordion, Grid } from "@mui/material";
import React from "react";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";
import TaskAccordionSummary from "./Accordion Summary/TaskAccordionSummary";
import useWindowSize from "../../../../../hooks/useWindowSize";
import TaskDetailsAccordionDetails from "./Accordion Details/TaskDetailsAccordionDetails";

const accordionStyle = () => {
  const windowSize = useWindowSize();
  const { open } = useStudentContext();
  return {
    width:
      windowSize.width >= "0" && windowSize.width <= "899"
        ? "100%"
        : windowSize.width >= "900" && windowSize.width <= "920"
        ? !open
          ? "21rem"
          : "29rem"
        : windowSize.width >= "921" && windowSize.width <= "955"
        ? !open
          ? "22.7rem"
          : "32rem"
        : windowSize.width >= "956" && windowSize.width <= "999"
        ? !open
          ? "23.4rem"
          : "33rem"
        : windowSize.width >= "1000" && windowSize.width <= "1050"
        ? !open
          ? "24.7rem"
          : "36rem"
        : windowSize.width >= "1051" && windowSize.width <= "1100"
        ? !open
          ? "26rem"
          : "38.8rem"
        : windowSize.width >= "1101" && windowSize.width <= "1150"
        ? !open
          ? "27.8rem"
          : "42rem"
        : windowSize.width >= "1151" && windowSize.width <= "1200"
        ? !open
          ? "28rem"
          : "22.8rem"
        : windowSize.width >= "1201" && windowSize.width <= "1250"
        ? !open
          ? "29.8rem"
          : "23.5rem"
        : windowSize.width >= "1251" && windowSize.width <= "1300"
        ? !open
          ? "31rem"
          : "24.5rem"
        : windowSize.width >= "1301" && windowSize.width <= "1350"
        ? !open
          ? "33.5rem"
          : "25.9rem"
        : windowSize.width >= "1351" && windowSize.width <= "1400"
        ? !open
          ? "23.5rem"
          : "27.5rem"
        : windowSize.width >= "1401" && windowSize.width <= "1450"
        ? !open
          ? "23.5rem"
          : "29.5rem"
        : windowSize.width >= "1451" && windowSize.width <= "1500"
        ? !open
          ? "24.5rem"
          : "19.5rem"
        : windowSize.width >= "1501" && windowSize.width <= "1550"
        ? !open
          ? "25.5rem"
          : "20.5rem"
        : windowSize.width >= "1551" && windowSize.width <= "1600"
        ? !open
          ? "26.2rem"
          : "21.2rem"
        : windowSize.width >= "1601" && windowSize.width <= "1650"
        ? !open
          ? "27.2rem"
          : "22.2rem"
        : !open
        ? "28rem"
        : "23.5rem",
  };
};

const TaskCard = ({ task }) => {
  const {
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
  } = useStudentContext();
  return (
    <Grid
      item
      sx={{
        width: {
          xs: "100%",
          sm: "95%",
          md: "auto",
          lg: "auto",
          xl: "auto",
        },
      }}
    >
      <Accordion
        expanded={expandedAccordionTaskDetails === `panel-${task.idTask}`}
        onChange={handleChangeExpandedAccordionTaskDetails(
          `panel-${task.idTask}`
        )}
        elevation={5}
        sx={accordionStyle}
      >
        <TaskAccordionSummary task={task} />
        <TaskDetailsAccordionDetails task={task} />
      </Accordion>
    </Grid>
  );
};

export default TaskCard;

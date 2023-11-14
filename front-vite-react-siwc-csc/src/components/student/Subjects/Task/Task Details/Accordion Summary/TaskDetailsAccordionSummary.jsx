import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { AccordionSummary, Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useStudentContext } from "../../../../../../context/Student/StudentProvider";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import { Assignment as AssignmentIcon } from "@mui/icons-material";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const TaskDetailsAccordionSummary = ({ task }) => {
  const theme = useTheme();
  const windowSize = useWindowSize();
  const { expandedAccordionTaskDetails } = useStudentContext();

  const date = new Date(task.taskDeadLine + " " + task.taskTimeLimit);

  const deadline = date.toLocaleDateString("en-us", options);
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel-${task.idTask}-bh-content`}
      id={`panel-${task.idTask}-bh-header`}
      sx={
        expandedAccordionTaskDetails === `panel-${task.idTask}`
          ? {
              backgroundColor: theme.palette.tertiary.tGreen100["main"],
              boxShadow: theme.shadows[5],
            }
          : {
              "&:hover": {
                backgroundColor: theme.palette.tertiary.tGreen100["main"],
              },
            }
      }
    >
      <Grid container {...(windowSize.width <= 200 && { pl: 1.5 })}>
        <Grid container alignItems="center" columnGap={1.5}>
          <Grid
            item
            {...(windowSize.width <= 280 && {
              xs: 12,
              container: true,
              justifyContent: "center",
              mb: 1,
            })}
          >
            <Avatar>
              <AssignmentIcon sx={{ height: 30 }} />
            </Avatar>
          </Grid>
          <Grid
            item
            {...(windowSize.width <= 280
              ? {
                  xs: 12,
                  justifyContent: "center",
                }
              : { xs: true })}
            container
            zeroMinWidth
          >
            <Typography
              variant="subtitle3"
              color={theme.palette.tertiary.tGreen100["contrastTextMain"]}
              fontWeight={600}
              fontSize={{ xs: 10, sm: 12 }}
              textAlign="center"
              letterSpacing=".17rem"
            >
              {task.taskName}
            </Typography>
          </Grid>
        </Grid>
        {task.taskDeadLine && task.taskTimeLimit && (
          <Grid mt={1} container wrap="nowrap">
            <Grid item xs container zeroMinWidth justifyContent="center">
              <Typography
                variant="subtitle3"
                fontSize={8}
                fontWeight={500}
                letterSpacing={".15rem"}
                color="gray"
              >
                DEADLINE : {deadline.toUpperCase()}, {date.getHours()}:{" "}
                {date.getMinutes()}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </AccordionSummary>
  );
};

export default TaskDetailsAccordionSummary;

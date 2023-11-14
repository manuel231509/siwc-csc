import { useTheme } from "@mui/material/styles";
import React from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import { useStudentContext } from "../../../../../../context/Student/StudentProvider";
import { AccordionSummary, Avatar, Grid, Typography } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const TaskAccordionSummary = ({ task }) => {
  const theme = useTheme();

  const windowSize = useWindowSize();

  const { expandedAccordionTaskDetails, select } = useStudentContext();

  const date = new Date(task.taskDeadLine + " " + task.taskTimeLimit);

  const deadline = date.toLocaleDateString("en-us", options);

  const {
    session: { student },
  } = useSelector((store) => store.ssession);

  const publishedTaskEntitys = task.publishedTaskEntitys.filter(
    (publishedTask) =>
      publishedTask.idTask === task.idTask &&
      publishedTask.idNumberStudent === student.idNumberStudent
  );

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
      <Grid container rowGap={1.2}>
        <Grid item sm container {...(windowSize.width <= 200 && { pl: 1.5 })}>
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
              xs
              container
              justifyContent={"space-between"}
              zeroMinWidth
            >
              <Grid container>
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
        {publishedTaskEntitys[0].qualifiedTask && (
          <Grid
            item
            xs={12}
            sm={2}
            container
            direction="column"
            justifyContent={"center"}
            alignItems="center"
            // rowGap={1}
          >
            <Grid container justifyContent="center" alignItems="center" p={0.3}>
              <Typography
                variant="subtitle3"
                color={theme.palette.tertiary.tGreen100["contrastTextMain"]}
                fontWeight={700}
                fontSize={{ xs: 10, sm: 12 }}
                textAlign="center"
                letterSpacing=".17rem"
              >
                NOTE
              </Typography>
            </Grid>
            <Typography
              variant="subtitle3"
              color={theme.palette.tertiary.tGreen100["contrastTextMain"]}
              fontWeight={700}
              fontSize={{ xs: 10, sm: 12 }}
              textAlign="center"
              letterSpacing=".17rem"
            >
              {publishedTaskEntitys[0].taskNote}
            </Typography>
          </Grid>
        )}
      </Grid>
    </AccordionSummary>
  );
};

export default TaskAccordionSummary;

import {
  Assignment as AssignmentIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { AccordionSummary, Avatar, Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const TaskDetailsAccordionSummary = ({ windowSize, task }) => {
  const { expandedAccordionTaskDetails } = useTasksAssignedContext();

  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange;

  const date = new Date(task.taskDeadLine + " " + task.taskTimeLimit);

  const deadline = date.toLocaleDateString("en-us", options);

  const openAccordionTaskDetails = Boolean(expandedAccordionTaskDetails);
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
                // backgroundColor: theme.palette.tertiary.tGreen50["light"],
                backgroundColor: theme.palette.tertiary.tGreen100["main"],
                boxShadow: theme.shadows[8],
              },
            }
      }
    >
      <Grid
        width={"100%"}
        container
        {...(windowSize.width <= 280 && { pl: 1.5 })}
        rowGap={1}
      >
        <Grid container alignItems="center" columnGap={1.5} rowGap={1}>
          <Grid item width={{ xs: "100%", sm: "auto" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar>
                <AssignmentIcon sx={{ height: 30 }} />
              </Avatar>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm
            container
            justifyContent={{ xs: "center", sm: "left" }}
            zeroMinWidth
          >
            <Typography
              variant="subtitle3"
              color={theme.palette.tertiary.tGreen100["contrastTextLight"]}
              fontWeight="600"
              fontSize={{ xs: 10, sm: 12 }}
              textAlign={{ sx: "center", sm: "left" }}
              letterSpacing={".17rem"}
            >
              {task.taskName}
            </Typography>
          </Grid>
        </Grid>
        {task.taskDeadLine && task.taskTimeLimit && (
          <Grid mt={0.5} container wrap="nowrap">
            <Grid item xs container zeroMinWidth justifyContent="center">
              <Typography
                variant="subtitle3"
                fontSize={7.5}
                fontWeight={500}
                letterSpacing={".15rem"}
                color="gray"
              >
                DEADLINE : {deadline.toUpperCase()}, {date.getHours()}:
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

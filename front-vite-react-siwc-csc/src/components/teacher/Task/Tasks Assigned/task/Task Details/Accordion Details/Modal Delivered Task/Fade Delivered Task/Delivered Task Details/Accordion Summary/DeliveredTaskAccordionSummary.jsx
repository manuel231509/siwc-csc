import {
  ExpandMore as ExpandMoreIcon,
  Task as TaskIcon,
} from "@mui/icons-material";
import { AccordionSummary, Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";
import { useTasksAssignedContext } from "../../../../../../../../../../../context/Tasks/TasksProvider";
import useWindowSize from "../../../../../../../../../../../hooks/useWindowSize";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const DeliveredTaskAccordionSummary = ({ deliveredTaskStudent, index }) => {
  const { width } = useWindowSize();
  const theme = useTheme();
  const { expandedAccordionDeliveredTaskDetails } = useTasksAssignedContext();

  const date = new Date(
    deliveredTaskStudent.publishedTaskEntitys[0]?.dateTaskDelivered
  );

  const dateTaskDelivered = date.toLocaleDateString("en-us", options);

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel-${deliveredTaskStudent.idNumberStudent}-bh-content`}
      id={`panel-${deliveredTaskStudent.idNumberStudent}-bh-header`}
      sx={
        expandedAccordionDeliveredTaskDetails ===
        `panel-${deliveredTaskStudent.idNumberStudent}`
          ? {
              backgroundColor: theme.palette.tertiary.tGreen100["main"],
              boxShadow: theme.shadows[7],
            }
          : {
              "&:hover": {
                backgroundColor: theme.palette.tertiary.tGreen100["main"],
                boxShadow: theme.shadows[9],
              },
            }
      }
    >
      <Grid
        width={"100%"}
        container
        {...(width <= 200 && { pl: 1.5 })}
        rowGap={0.5}
      >
        <Grid container alignItems={"center"} columnGap={3} rowGap={1}>
          <Grid item width={{ xs: "100%", sm: "10%", md: "auto" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar>
                <TaskIcon sx={{ height: 30 }} />
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm container zeroMinWidth rowGap={0.3}>
            <Grid container>
              <Typography
                variant="subtitle3"
                color={theme.palette.tertiary.tGreen100["contrastTextLight"]}
                fontWeight="600"
                fontSize={{ xs: 10, sm: 12 }}
                textAlign="justify"
                letterSpacing={".17rem"}
              >
                {deliveredTaskStudent.fullNamesStudent.toLocaleUpperCase()}{" "}
                {deliveredTaskStudent.fullSurnamesStudent?.toLocaleUpperCase()}
              </Typography>
            </Grid>
            <Grid container>
              <Typography
                variant="subtitle3"
                color={theme.palette.tertiary.tGreen100["contrastTextLight"]}
                fontWeight="500"
                fontSize={{ xs: 7, sm: 9 }}
                textAlign="justify"
                letterSpacing={".17rem"}
              >
                GRADE {deliveredTaskStudent.idDegree.replace("G", "")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container wrap="nowrap">
          <Grid item xs container zeroMinWidth justifyContent={"center"}>
            <Typography
              variant="subtitle3"
              fontSize={7.5}
              fontWeight={500}
              letterSpacing={".15rem"}
              color="gray"
            >
              DATE TASK DELIVERED: {dateTaskDelivered.toLocaleUpperCase()},{" "}
              {date.getHours()}:{date.getMinutes()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

export default DeliveredTaskAccordionSummary;

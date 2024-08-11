import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  AccordionDetails,
  Accordion as AccordionMui,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lazy } from "react";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../context/Teacher/TeacherProvider";
import { SuspenseProgress } from "../../../../../../SuspenseProgress/SusProg";

const TasksCards = lazy(() => import("../../TasksCards"));

const Accordion = ({ subject }) => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange["300"];

  const { expandedAccordionSubjects, handleChangeExpandedAccordionSubjects } =
    useTasksAssignedContext();

  const { handleChangeSelect } = useTeacherContext();

  const onClickAccordionSubject = (idSubject, nameSubject) => () => {
    handleChangeSelect("subjects", { idSubject, nameSubject });
  };

  return (
    <AccordionMui
      key={`panel-${subject.idSubject}`}
      expanded={expandedAccordionSubjects === `panel-${subject.idSubject}`}
      onChange={handleChangeExpandedAccordionSubjects(
        `panel-${subject.idSubject}`
      )}
      onClick={onClickAccordionSubject(subject.idSubject, subject.nameSubject)}
      sx={{
        width: "100%",
        backgroundColor: sDeepOrange["light"]["value"],
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${subject.idSubject}-bh-content`}
        id={`panel-${subject.idSubject}-bh-header`}
        sx={{
          mt: 0.5,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          color={sDeepOrange["light"]["contrastText"]}
          fontWeight={600}
          alignItems="center"
          letterSpacing=".17rem"
          sx={{
            flexShrink: 0,
          }}
        >
          {subject.nameSubject.toUpperCase()}
        </Typography>
      </AccordionSummary>

      {expandedAccordionSubjects === `panel-${subject.idSubject}` && (
        <AccordionDetails>
          <SuspenseProgress>
            <Grid
              container
              sx={{
                flexGrow: 1,
              }}
            >
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <TasksCards />
                </Grid>
              </Grid>
            </Grid>
          </SuspenseProgress>
        </AccordionDetails>
      )}
    </AccordionMui>
  );
};
export default Accordion;

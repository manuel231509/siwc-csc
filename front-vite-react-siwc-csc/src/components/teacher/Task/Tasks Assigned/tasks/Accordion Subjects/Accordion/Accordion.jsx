import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  AccordionDetails,
  Accordion as AccordionMui,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../context/Teacher/TeacherProvider";
import TasksCards from "../../TasksCards";

const Accordion = ({ subject }) => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange["300"];

  const {
    expandedAccordionSubjects,
    handleChangeExpandedAccordionSubjects,
    handleChangePeriodsPlans1,
  } = useTasksAssignedContext();

  const { handleChangeSelect, select } = useTeacherContext();

  const onClickAccordionSubject = (idSubject, nameSubject) => () => {
    handleChangeSelect("subjects", { idSubject, nameSubject });
  };

  return (
    <AccordionMui
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
        mt: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${subject.idSubject}-bh-content`}
        id={`panel-${subject.idSubject}-bh-header`}
        sx={{
          mt: 1.1,
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
      <AccordionDetails>
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
      </AccordionDetails>
    </AccordionMui>
  );
};
export default Accordion;

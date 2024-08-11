import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  AccordionDetails,
  Accordion as AccordionMui,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";
import Card from "../../Card/Card";
import { lazy } from "react";

const Accordion = ({ subject }) => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange["300"];

  const { expandedAccordion, handleChangeExpandedAccordion } =
    useTeacherContext();

  return (
    <AccordionMui
      expanded={expandedAccordion === `panel-${subject.idSubject}`}
      onChange={handleChangeExpandedAccordion(
        `panel-${subject.idSubject}`,
        "subject",
        subject
      )}
      sx={{
        width: "100%",
        backgroundColor: sDeepOrange["light"]["value"],
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        mt: 1,
      }}
      slotProps={{
        transition: { unmountOnExit: true },
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
          fontWeight="600"
          alignItems={"center"}
          letterSpacing={".17rem"}
          sx={{ flexShrink: 0 }}
        >
          {subject.nameSubject.toUpperCase()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid sx={{ flexGrow: 1 }} container>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              spacing={{ xs: 1, sm: 2, md: 5, lg: 4 }}
            >
              {expandedAccordion === `panel-${subject.idSubject}` &&
                subject.degreeSubjectEntitys.map((degreeSubject) => (
                  <Card
                    key={degreeSubject.idDegree}
                    degreeSubject={degreeSubject}
                  />
                ))}
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </AccordionMui>
  );
};

export default Accordion;

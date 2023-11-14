import { Fab, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";

const Row = ({ subject, ratings, periodsCurrent, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row" align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }}
        >
          {subject.nameSubject}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }}
        >
          {subject.subjectHours}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }}
        >
          {`${subject.teacherDTO.fullNames} ${subject.teacherDTO.fullSurNames}`.toUpperCase()}
        </Typography>
      </TableCell>
      {periodsCurrent.map((per, index) => {
        const rating = ratings.find((rat) => rat.idPeriod === per.idPeriod);
        let periodNote =
          (rating?.activitiesNote / rating?.amountActivities) *
            (per.valuePercentageActivities / 100) +
          rating?.bimonthlyNote * (per.valuePercentageBimonthly / 100);
        console.log("periodNote: ", periodNote);
        periodNote = isNaN(periodNote) ? 0 : Number(periodNote.toFixed(1));
        periodNote = periodNote > 5 ? 5 : periodNote;
        return (
          <TableCell key={index} align="center">
            <Fab
              size="small"
              aria-label="add"
              sx={{
                minHeight: "10px",
                minWidth: "10px",
                width: { xs: "35px", sm: "40px", md: "45px" },
                height: { xs: "35px", sm: "40px", md: "45px" },
                bgcolor:
                  periodNote >= 0 && periodNote < 3
                    ? "#f44336"
                    : periodNote >= 3 && periodNote < 4
                    ? "#ff5722"
                    : "#4caf50",
                color:
                  periodNote >= 0 && periodNote < 4
                    ? "#FFFFFF"
                    : periodNote >= 4 && "rgba(0, 0, 0, 0.87)",
                "&:hover": {
                  backgroundColor:
                    periodNote >= 0 && periodNote < 3
                      ? "#AA2E25"
                      : periodNote >= 3 && periodNote < 4
                      ? "#C9471F"
                      : "#357A38",
                  color: periodNote >= 3 && "#FFFFFF",
                },
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                letterSpacing=".1rem"
                fontSize={{ xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }}
              >
                {periodNote}
              </Typography>
            </Fab>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default Row;

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";
import Row from "./Table Row/Row";

const CollapsibleTable = () => {
  const { student, periods, select, subjectid } = useStudentContext();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
              >
                SUBJECT
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
              >
                HOURS
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
              >
                TEACHER
              </Typography>
            </TableCell>
            {periods.data.map(
              (per, index) =>
                subjectid[per.idPeriod] <= subjectid[select.periods] && (
                  <TableCell align="center" key={index}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={800}
                      letterSpacing=".1rem"
                    >
                      {subjectid[per.idPeriod]}P
                    </Typography>
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {student.value?.subjects?.map((subject, index) => {
            const ratings = student.value.raitingEntitys.filter(
              (rating) =>
                rating.idDegSubj ===
                `${student.value.idDegree}-${subject.idSubject}`
            );
            const periodsCurrent = periods.data.filter(
              (per) => subjectid[per.idPeriod] <= subjectid[select.periods]
            );
            console.log("periodsCurrent", periodsCurrent);
            return (
              <Row
                key={index}
                subject={subject}
                ratings={ratings}
                periodsCurrent={periodsCurrent}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;

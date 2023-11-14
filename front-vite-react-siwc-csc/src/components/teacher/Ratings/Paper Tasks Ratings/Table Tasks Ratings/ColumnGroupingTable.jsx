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
import { lazy } from "react";
import { useTasksAssignedContext } from "../../../../../context/Tasks/TasksProvider";

const Row = lazy(() => import("./Table Row/Row"));

const ColumnGroupingTable = () => {
  const { students, tasks, select } = useTasksAssignedContext();

  const groupedData = tasks.data.reduce((result, item) => {
    const planName = item.periodPlanDTO1.planName;
    if (!result[planName]) {
      result[planName] = [];
    }
    result[planName].push(item);
    return result;
  }, {});
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                STUDENTS
              </Typography>
            </TableCell>
            {Object.entries(groupedData).map(([clave, valor], index) => {
              return (
                <TableCell
                  key={index}
                  align="center"
                  colSpan={valor.length}
                  sx={{ borderLeft: "1px solid #E0E0E0" }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    letterSpacing=".1rem"
                    fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
                  >
                    {clave.toUpperCase()}
                  </Typography>
                </TableCell>
              );
            })}
            <TableCell
              align="center"
              rowSpan={2}
              sx={{
                borderRight: "1px solid #E0E0E0",
                borderLeft: "1px solid #E0E0E0",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                BIMONTHLY
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{
                borderRight: "1px solid #E0E0E0",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                DEFINITIVE
              </Typography>
            </TableCell>
            <TableCell align="center" rowSpan={2}>
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                ACTIONS
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                ID NUMBER
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                FULL NAMES
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                letterSpacing=".1rem"
                fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
              >
                FULL SURNAMES
              </Typography>
            </TableCell>
            {Object.entries(groupedData).map(([clave, item]) => {
              return item.map((task, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    ...(index === 0 && { borderLeft: "1px solid #E0E0E0" }),
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    letterSpacing=".1rem"
                    fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
                  >
                    {task.name.toUpperCase()}
                  </Typography>
                </TableCell>
              ));
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!students.error.data &&
            Array.isArray(students.data) &&
            students.data.length > 0 &&
            students.data?.map((student, index) => {
              const tasksByStudent = tasks.data.map((task) => {
                const publishedTaskDTOs = task.publishedTaskDTOs.find(
                  (publishedTaks) =>
                    publishedTaks.idNumberStudent === student.idNumberStudent
                );

                if (
                  publishedTaskDTOs !== undefined &&
                  publishedTaskDTOs.studentDTO.raitingDTOs !== undefined
                ) {
                  const ratingDTOs = publishedTaskDTOs.studentDTO.raitingDTOs;
                  const raitingDTOs =
                    ratingDTOs instanceof Array
                      ? ratingDTOs.find((rating) => {
                          return (
                            rating.idDegSubj ===
                              task.periodPlanDTO1.idDegSubj &&
                            rating.idPeriod === task.periodPlanDTO1.idPeriod
                          );
                        })
                      : ratingDTOs.idDegSubj ===
                          task.periodPlanDTO1.idDegSubj &&
                        ratingDTOs.idPeriod === task.periodPlanDTO1.idPeriod &&
                        ratingDTOs;
                  publishedTaskDTOs.studentDTO.raitingDTOs = raitingDTOs;
                }
                return { ...task, publishedTaskDTOs };
              });

              const ratingEntitys = student.raitingEntitys;

              if (ratingEntitys) {
                student.raitingEntitys =
                  ratingEntitys instanceof Array
                    ? ratingEntitys.find((rating) => {
                        return (
                          rating.idDegSubj ===
                            `${select.grades}-${select.subjects}` &&
                          rating.idPeriod === select.periods
                        );
                      })
                    : ratingEntitys.idDegSubj ===
                        `${select.grades}-${select.subjects}` &&
                      ratingEntitys.idPeriod === select.periods &&
                      ratingEntitys;
              }

              const groupedData = tasksByStudent.reduce((result, item) => {
                const planName = item.periodPlanDTO1.planName;
                if (!result[planName]) {
                  result[planName] = [];
                }
                result[planName].push(item);
                return result;
              }, {});

              return (
                <Row
                  key={index}
                  student={student}
                  tasks={tasks.data}
                  groupedData={groupedData}
                />
              );
            })}
          {students.error && (
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell component="th" scope="row" align="center" colSpan={6}>
                <Typography
                  variant="subtitle2"
                  fontWeight={500}
                  letterSpacing=".1rem"
                  fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
                >
                  {students.error.data?.message}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ColumnGroupingTable;

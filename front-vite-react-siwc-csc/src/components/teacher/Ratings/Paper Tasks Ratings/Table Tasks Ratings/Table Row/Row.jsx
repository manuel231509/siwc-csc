import { Fab, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import { useForm } from "../../../../../../hooks/useForm";
import FieldsControl from "../../../../../fields/FieldsControl";
import validate from "../../../../../fields/field validation/validate";

const textFieldStyledAttributes = (taskNote) => (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "100%",
    overflow: "hidden",

    [theme.breakpoints.between("xs", "sm")]: {
      width: "38px",
      height: "38px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "40px",
      height: "40px",
    },
    [theme.breakpoints.up("md")]: {
      width: "45px",
      height: "45px",
    },

    backgroundColor:
      taskNote >= 0 && taskNote < 3
        ? "#f44336"
        : taskNote >= 3 && taskNote < 4
        ? "#ff5722"
        : "#4caf50",
    color:
      taskNote >= 0 && taskNote < 4
        ? "#FFFFFF"
        : taskNote >= 4 && taskNote <= 5.0 && "rgba(0, 0, 0, 0.87)",
    "&:hover": {
      backgroundColor:
        taskNote >= 0 && taskNote < 3
          ? "#AA2E25"
          : taskNote >= 3 && taskNote < 4
          ? "#C9471F"
          : "#357A38",
      color: taskNote >= 3 && "#FFFFFF",
    },
    "& .Mui-disabled": {
      WebkitTextFillColor:
        taskNote >= 0 && taskNote < 4
          ? "rgba(255, 255, 255, 0.7)"
          : taskNote >= 4 && taskNote <= 5.0 && "rgba(0, 0, 0, 0.7)",
    },
    "& input": {
      padding: "12px 8px",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
});

const initialStateFields = {
  qualificationNote: "",
};

const Row = ({ student, tasks, groupedData }) => {
  const { select } = useTasksAssignedContext();
  const { session } = useSelector((store) => store.ssession);
  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields, nameField);

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");

    setFieldValidate(!fieldValid);

    if (fieldsValues === fields) {
      return fieldValid;
    }
  };
  const {
    fields,
    handleChangeFields,
    handleChangeFields_1,
    handleChangeFields2,
    errors,
    setErrors,
  } = useForm(initialStateFields, true, validateFields);

  useEffect(() => {
    const updatedFieldsNoteTasks = Object.entries(groupedData).reduce(
      (acc, [clave, item]) => {
        item.forEach((task) => {
          const taskNote = task?.publishedTaskDTOs?.taskNote;
          const delivered = task?.publishedTaskDTOs?.delivered;
          if (task.publishedTaskDTOs !== undefined && delivered) {
            acc[`noteTask_${task.publishedTaskDTOs.idTask}`] = taskNote;
          }
        });
        return acc;
      },
      {}
    );

    const updateFieldBimonthlyNote = {
      [`bimonthly_${
        student.raitingEntitys
          ? student.raitingEntitys.idRaiting
          : student.idNumberStudent
      }`]: student.raitingEntitys ? student.raitingEntitys.bimonthlyNote : 0,
    };

    handleChangeFields2({
      ...fields,
      ...updatedFieldsNoteTasks,
      ...updateFieldBimonthlyNote,
    });
  }, [groupedData]);

  let periodNote =
    (student.raitingEntitys?.activitiesNote /
      student.raitingEntitys?.amountActivities) *
      (select.currentPeriod?.valuePercentageActivities / 100) +
    student.raitingEntitys?.bimonthlyNote *
      (select.currentPeriod?.valuePercentageBimonthly / 100);
  periodNote = isNaN(periodNote) ? 0 : Number(periodNote.toFixed(1));
  periodNote = periodNote > 5 ? 5 : periodNote;

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row" align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
        >
          {String(student.idNumberStudent).toUpperCase()}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
        >
          {student.fullNamesStudent.toUpperCase()}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
        >
          {student.fullSurNamesStudent.toUpperCase()}
        </Typography>
      </TableCell>

      {/* START FIELD ASSIGN NOTE TASK */}
      {Object.entries(groupedData).map(([clave, item]) => {
        return item.map((task, index) => {
          const taskNote = task?.publishedTaskDTOs?.taskNote;
          const delivered = task?.publishedTaskDTOs?.delivered;
          return (
            <TableCell key={index} align="center">
              {taskNote <= 0 && (
                <Typography
                  variant="subtitle2"
                  fontWeight={500}
                  letterSpacing=".1rem"
                  fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
                  {...(task.publishedTaskDTOs &&
                    !delivered && {
                      sx: {
                        display: "inline-block",
                        backgroundColor: "#fff59d",
                        color: "rgba(0, 0, 0, 0.87)",
                        padding: "7px",
                        borderRadius: "15%",
                        fontWeight: 700,
                        textDecoration: "none",
                      },
                    })}
                >
                  {task.publishedTaskDTOs !== undefined
                    ? delivered
                      ? taskNote <= 0 && "TASK NOT YET QUALIFIED."
                      : "UNDELIVERED "
                    : "HOMEWORK NOT PUBLISHED TO THE STUDENT."}
                </Typography>
              )}
              {task.publishedTaskDTOs !== undefined &&
                delivered &&
                taskNote > 0 && (
                  <FieldsControl.FieldAssignNoteTask
                    fields={fields}
                    handleChangeFields={handleChangeFields_1}
                    errors={errors[`noteTask_${task.publishedTaskDTOs.idTask}`]}
                    otherTextFieldProps={{
                      id: task.publishedTaskDTOs.idTask,
                      name: `noteTask_${task.publishedTaskDTOs.idTask}`,
                      value:
                        fields[`noteTask_${task.publishedTaskDTOs.idTask}`] ??
                        "",
                      onChange: handleChangeFields_1(
                        `noteTask_${task.publishedTaskDTOs.idTask}`
                      ),
                      "aria-describedby": `component-error_noteTask_${task.publishedTaskDTOs.idTask}`,
                      autoComplete: `noteTask_${task.publishedTaskDTOs.idTask}`,
                      variant: "outlined",
                      required: true,
                      disabled: true,
                    }}
                    handleClickClose={() => {}}
                    textFieldStyledAttributes={textFieldStyledAttributes(
                      taskNote
                    )}
                  />
                )}
            </TableCell>
          );
        });
      })}
      {/* END FIELD ASSIGN NOTE TASK */}

      {/* START FIELD ASSIGN BIMONTHLY NOTE */}
      <TableCell align="center">
        <Typography
          variant="subtitle2"
          fontWeight={500}
          letterSpacing=".1rem"
          // fontSize={{ xs: 9, sm: 10, md: 11, lg: 13, xl: 14 }}
        >
          <FieldsControl.FieldAssignNoteTask
            fields={fields}
            handleChangeFields={handleChangeFields_1}
            errors={
              errors[
                `bimonthly_${
                  student.raitingEntitys
                    ? student.raitingEntitys.idRaiting
                    : student.idNumberStudent
                }`
              ]
            }
            otherTextFieldProps={{
              id: student.raitingEntitys
                ? student.raitingEntitys.idRaiting
                : `${student.idNumberStudent}`,
              name: `bimonthly_${
                student.raitingEntitys
                  ? student.raitingEntitys.idRaiting
                  : student.idNumberStudent
              }`,
              value:
                fields[
                  `bimonthly_${
                    student.raitingEntitys
                      ? student.raitingEntitys.idRaiting
                      : student.idNumberStudent
                  }`
                ] ?? "",
              onChange: handleChangeFields_1(
                `bimonthly_${
                  student.raitingEntitys
                    ? student.raitingEntitys.idRaiting
                    : student.idNumberStudent
                }`
              ),
              "aria-describedby": `component-error_bimonthly_${
                student.raitingEntitys
                  ? student.raitingEntitys.idRaiting
                  : student.idNumberStudent
              }`,
              autoComplete: `bimonthly_${
                student.raitingEntitys
                  ? student.raitingEntitys.idRaiting
                  : student.idNumberStudent
              }`,
              variant: "outlined",
              required: true,
              disabled: true,
            }}
            handleClickClose={() => {}}
            textFieldStyledAttributes={textFieldStyledAttributes(
              student.raitingEntitys ? student.raitingEntitys.bimonthlyNote : 0
            )}
          />
        </Typography>
      </TableCell>
      {/* END FIELD ASSIGN BIMONTHLY NOTE */}

      {/* START FIELD DEFINITIVE NOTE */}
      <TableCell align="center">
        <Fab
          size="small"
          aria-label="add"
          sx={{
            minHeight: "10px",
            minWidth: "10px",
            boxShadow: "none",
            width: { xs: "38px", sm: "40px", md: "45px" },
            height: { xs: "38px", sm: "40px", md: "45px" },
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
            fontSize={{ xs: 10, sm: 12, md: 13, lg: 13, xl: 14 }}
          >
            {periodNote}
          </Typography>
        </Fab>
      </TableCell>
      {/* END FIELD DEFINITIVE NOTE */}
    </TableRow>
  );
};
// >fFUIC81aPg[pV.1

export default Row;

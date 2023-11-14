import {
  AddTask as AddTaskIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Badge, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../../../context/Teacher/TeacherProvider";
import {
  deleteFile,
  uploadFile,
} from "../../../../../../../../../firebase/config-firebase";
import useFetchAndLoad from "../../../../../../../../../hooks/useFetchAndLoad1";
import { Form, useForm } from "../../../../../../../../../hooks/useForm";
import useWindowSize from "../../../../../../../../../hooks/useWindowSize";
import {
  getPeriodsPlansByIdPeriodAndSubectAndDegree,
  savePeriodPlanTask,
} from "../../../../../../../../../services/period plan/PeriodPlanService";
import { getStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher } from "../../../../../../../../../services/student/StudentService";
import { sweetAlertButtonAddTask } from "../../../../../../../../../sweetAlert2/SweetAlert";
import FieldsControl from "../../../../../../../../fields/FieldsControl";
import validate from "../../../../../../../../fields/field validation/validate";
import useStyles from "../../../Styles/Styles";
import MultipleFileUploadField from "./Upload Field/MultipleFileUploadField";

const initialStateFields = {
  title: "",
  instructions: "",
  students: [],
  qualificationPoints: "",
  deadline: null,
  timeLimit: null,
  plan: null,
};

const listQualificationPoints = [
  { id: "0", name: "UNRATED" },
  { id: "1", name: "1.0" },
  { id: "2", name: "2.0" },
  { id: "3", name: "3.0" },
  { id: "4", name: "4.0" },
  { id: "5", name: "5.0" },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const FormAddTask = () => {
  const windowSize = useWindowSize();

  const theme = useTheme();
  const classes = useStyles();

  const { callEndPoint } = useFetchAndLoad();

  const { select } = useTeacherContext();

  const {
    periodsPlans,
    loading,
    handleChangeLoading,
    handleChangePeriodsPlans1,
  } = useTasksAssignedContext();

  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    if (nameField === "deadline") {
      delete tempErrors.timeLimit;
    }

    if (fieldsValues["qualificationPoints"] === "0") {
      handleChangeFields2({ ...fields, ...fieldsValues, ["deadline"]: null });
      delete tempErrors.deadline;
    }

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");

    setFieldValidate(!fieldValid);

    if (fieldsValues === fields) {
      return fieldValid;
    }
  };

  const {
    fields,
    setFields,
    handleChangeFields,
    handleChangeFields1,
    handleChangeFields2,
    handleChangeFieldsDatePicker,
    handleChangeFieldAutoComplete,
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields);

  const [files, setFiles] = useState([]);

  const handleChangeFieldsFiles = (value) => {
    setFiles(value);
  };

  const handleResetFiles = () => {
    setFiles([]);
  };

  const handleClickFieldsAllStudents = () => {
    setFields({
      ...fields,
      ["students"]:
        fields.students.length === listStudents.value.length
          ? []
          : listStudents.value,
    });
    validateFields({
      ["students"]:
        fields.students.length === listStudents.value.length
          ? []
          : listStudents.value,
    });
  };

  const handleClickClose = (nameField) => (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [nameField]:
        nameField === "deadline" || nameField === "timeLimit" ? null : "",
    });

    validateFields({
      [nameField]:
        nameField === "deadline" || nameField === "timeLimit" ? null : "",
    });
  };

  const handleUploadFiles = async () => {
    let arrayDownloadURL = [];
    for (const file in files) {
      if (Object.hasOwnProperty.call(files, file)) {
        const element = files[file];
        const resultURL = await uploadFile(
          element,
          `${teacher.fullNamesTeacher} ${teacher.fullSurNamesTeacher}/${select.subjects.nameSubject}/${select.degree.nameDegree}`,
          handleChangeLoading,
          "periodPlanTask"
        );
        arrayDownloadURL.push(resultURL);
      }
    }
    handleChangeDownloadURL1(arrayDownloadURL);
    return arrayDownloadURL;
  };

  const handleDeleteFiles = async () => {
    for (const file in files) {
      if (Object.hasOwnProperty.call(files, file)) {
        const element = files[file];
        await deleteFile(
          element,
          `${teacher.fullNamesTeacher} ${teacher.fullSurNamesTeacher}/${select.subjects.nameSubject}/${select.degree.nameDegree}`,
          select.degree.nameDegree
        );
      }
    }
    handleChangeDownloadURL1([]);
  };

  const handleSubmitAddTask = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      sweetAlertButtonAddTask(
        theme,
        saveApiPeriodPlanTask,
        handleUploadFiles,
        handleDeleteFiles,
        select,
        fields,
        resetFields,
        handleResetFiles,
        updateDataPeriodPlans,
        jwt,
        bearer
      );
    }
  };

  const getApiStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher = async (
    idDegree,
    idSubject,
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher(
        idDegree,
        idSubject,
        idNumberTeacher,
        jwt,
        bearer
      ),
      "students"
    );

  const saveApiPeriodPlanTask = async (periodPlanTask, jwt, bearer) =>
    await callEndPoint(
      savePeriodPlanTask(periodPlanTask, jwt, bearer),
      "periodPlanTask"
    );

  const getApiPeriodsPlansByIdPeriodAndSubectAndDegree = async (
    idPeriod,
    idSubject,
    idDegree,
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getPeriodsPlansByIdPeriodAndSubectAndDegree(
        idPeriod,
        idSubject,
        idDegree,
        idNumberTeacher,
        jwt,
        bearer
      ),
      "periods-plans"
    );

  const updateDataPeriodPlans = () => {
    getApiPeriodsPlansByIdPeriodAndSubectAndDegree(
      select.periods,
      select.subjects.idSubject,
      select.grades,
      teacher.idNumberTeacher,
      jwt,
      bearer
    )
      .then(({ data }) => {
        handleChangePeriodsPlans1({ value: data, error: "" });
      })
      .catch((error) =>
        handleChangePeriodsPlans1({
          value: [],
          error: error.response?.data?.message,
        })
      );
  };

  const [listStudents, setListStudents] = useState({
    value: [],
    error: {},
  });

  const handleChangeListStudents = (nameField, value) => {
    setListStudents({ ...listStudents, [nameField]: value });
  };

  const [downloadURL, setDownloadURL] = useState([]);
  const handleChangeDownloadURL = (downloadURL) => {
    setDownloadURL((prevUrls) => [...prevUrls, downloadURL]);
  };
  const handleChangeDownloadURL1 = (arrayDownloadURL) => {
    setDownloadURL(arrayDownloadURL);
  };

  const ssessionState = useSelector((store) => store.ssession);

  const { jwt, bearer, session } = ssessionState;

  const { teacher } = session;

  useEffect(() => {
    console.log("degree: ", select.degree);
    console.log("select.subjects.idSubject: ", select.subjects.idSubject);
    getApiStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher(
      select.grades,
      select.subjects.idSubject,
      teacher.idNumberTeacher,
      jwt,
      bearer
    )
      .then(({ data }) => {
        handleChangeListStudents("value", data);
      })
      .catch((error) => {
        handleChangeListStudents("error", error);
      });
  }, []);

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Form
        className={classes.form}
        sx={{
          ...(windowSize.width > 600 && {
            width: "75vw",
          }),
        }}
        onSubmit={handleSubmitAddTask}
      >
        <Grid
          container
          columnGap={{ xs: 2, sm: 2.5, md: 3.5 }}
          rowGap={2}
          alignItems="center"
        >
          <Grid
            item
            xs
            container
            rowGap={1.5}
            boxShadow={5}
            sx={{
              padding: 1.5,
              ...(windowSize.width > 400 && windowSize.width < 420
                ? {
                    maxWidth: "39vw",
                  }
                : windowSize.width >= 420 &&
                  windowSize.width <= 450 && {
                    maxWidth: "100vw",
                  }),
            }}
          >
            <FieldsControl.FieldTitle
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              otherTextFieldProps={{
                variant: "filled",
                autoFocus: true,
              }}
              handleClickClose={handleClickClose}
            />
            <FieldsControl.FieldInstructions
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              otherTextFieldProps={{
                variant: "filled",
                multiline: true,
                rows: 6,
              }}
              handleClickClose={handleClickClose}
            />
            <Grid
              container
              mt={1}
              p={1.5}
              sx={{
                border: "1px solid gray",
                borderRadius: "12px",
              }}
            >
              <Grid
                container
                justifyContent={"center"}
                pb={1}
                borderBottom={"1px solid gray"}
              >
                <StyledBadge
                  sx={{ mr: "1rem" }}
                  badgeContent={files.length}
                  color="secondary"
                >
                  <AttachFileIcon />
                </StyledBadge>
                <Typography
                  variant="subtitle1"
                  fontSize={12}
                  fontWeight={600}
                  letterSpacing=".17rem"
                >
                  ATTACH FILE
                </Typography>
              </Grid>
              <MultipleFileUploadField
                files={files}
                handleChangeFieldsFiles={handleChangeFieldsFiles}
                windowSize={windowSize}
              />
            </Grid>
          </Grid>

          <Grid
            item
            {...(windowSize.width <= 400 ? { xs: 12 } : { xs: true })}
            p={2}
            container
            rowGap={1.5}
            boxShadow={5}
          >
            <FieldsControl.FieldStudents
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              listStudents={listStudents.value}
              handleClickFieldsAllStudents={handleClickFieldsAllStudents}
            />
            <FieldsControl.FieldQualificationPoints
              fields={fields}
              handleChangeFields={handleChangeFields}
              listQualificationPoints={listQualificationPoints}
              errors={errors}
            />
            <FieldsControl.FieldDeadLine
              fields={fields}
              handleChangeFieldsDatePicker={handleChangeFieldsDatePicker}
              errors={errors}
              handleClickClose={handleClickClose}
            />
            {fields.deadline && errors.deadline === "" && (
              <FieldsControl.FieldTimeLimit
                fields={fields}
                handleChangeFieldsDatePicker={handleChangeFieldsDatePicker}
                errors={errors}
                handleClickClose={handleClickClose}
              />
            )}
            <FieldsControl.FieldPlan
              fields={fields}
              handleChangeFieldAutoComplete={handleChangeFieldAutoComplete}
              errors={errors}
              listPlan={periodsPlans.value}
            />
          </Grid>
        </Grid>

        <Grid container mt={3} mb={0} rowSpacing={5} justifyContent="center">
          <LoadingButton
            type="submit"
            aria-label="add a taks"
            color="secondary"
            size="large"
            loading={loading["periodPlanTask"]}
            loadingPosition="start"
            startIcon={<AddTaskIcon />}
            disabled={fieldValidate}
            variant="contained"
          >
            <span>Add</span>
          </LoadingButton>
        </Grid>
      </Form>
    </Grid>
  );
};
export default FormAddTask;

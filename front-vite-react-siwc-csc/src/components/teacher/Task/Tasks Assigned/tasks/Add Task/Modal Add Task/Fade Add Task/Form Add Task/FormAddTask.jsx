import {
  AddTask as AddTaskIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Badge, Grid, Skeleton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../../../../context/Teacher/TeacherProvider";
import {
  deleteFile,
  uploadFile,
} from "../../../../../../../../../firebase/config-firebase";
import useFetchAndLoad from "../../../../../../../../../hooks/useFetchAndLoad3";
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
import { SuspenseProgressSkeleton } from "../../../../../../../../SuspenseProgress/SusProg";
const MultipleFileUploadField = lazy(() =>
  import("./Upload Field/MultipleFileUploadField")
);

const initialStateFields = {
  title: "",
  instructions: "",
  students: [],
  qualificationPoints: "",
  deadline: null,
  timeLimit: null,
  plan: null,
};

const initialFieldsRef = {
  deadline: null,
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

  const { select } = useTeacherContext();

  const {
    periodsPlans,
    loading,
    handleChangeLoading,
    handleChangePeriodsPlans1,
  } = useTasksAssignedContext();

  const { callEndPoint } = useFetchAndLoad(handleChangeLoading);

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
    handleChangeFields2,
    handleChangeFieldsDatePicker,
    handleChangeFieldAutoComplete,
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields, initialFieldsRef);

  const [files, setFiles] = useState([]);

  const handleChangeFieldsFiles = (value) => {
    setFiles(value);
  };

  const handleResetFiles = () => {
    setFiles([]);
  };

  const handleClickFieldsAllStudents = (event) => {
    event.preventDefault();
    setFields((prev) => ({
      ...prev,
      ["students"]:
        prev.students.length === listStudents.value.length
          ? []
          : [...listStudents.value],
    }));
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
      "students",
      "lstudents"
    );

  const saveApiPeriodPlanTask = async (periodPlanTask, jwt, bearer) =>
    await callEndPoint(
      savePeriodPlanTask(periodPlanTask, jwt, bearer),
      "periodPlanTask",
      "lperiodPlanTask"
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
      "periods-plans",
      "lperiods-plans"
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
  console.log("FormAddTask");
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      sx={{ minHeight: "100%" }}
      boxShadow={10}
    >
      <Form
        className={classes.form}
        sx={{
          ...(windowSize.width > 600 && {
            width: "75vw",
          }),
        }}
        onSubmit={handleSubmitAddTask}
      >
        <Grid container rowGap={3}>
          <Grid
            container
            columnGap={{ xs: 2, sm: 2.5, md: 3.5 }}
            rowGap={1}
            alignItems="center"
          >
            <Grid
              item
              {...(windowSize.width <= 550 ? { xs: 12 } : { xs: true })}
              container
              rowGap={1.5}
              boxShadow={15}
              sx={{
                padding: 1.5,
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
              {...(windowSize.width <= 550 ? { xs: 12 } : { xs: true })}
              p={2}
              container
              rowGap={1.5}
              boxShadow={15}
            >
              {!loading["students"] ? (
                <FieldsControl.FieldStudents
                  fields={fields}
                  handleChangeFields={handleChangeFields}
                  errors={errors}
                  listStudents={listStudents.value}
                  handleClickFieldsAllStudents={handleClickFieldsAllStudents}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation={"wave"}
                  sx={{ minWidth: "100%" }}
                  height={55}
                />
              )}
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
                <SuspenseProgressSkeleton
                  skeletonProps={{
                    variant: "rectangular",
                    animation: "wave",
                    sx: { minWidth: "100%" },
                    height: 55,
                  }}
                >
                  <FieldsControl.FieldTimeLimit
                    fields={fields}
                    handleChangeFieldsDatePicker={handleChangeFieldsDatePicker}
                    errors={errors}
                    handleClickClose={handleClickClose}
                  />
                </SuspenseProgressSkeleton>
              )}
              <FieldsControl.FieldPlan
                fields={fields}
                handleChangeFieldAutoComplete={handleChangeFieldAutoComplete}
                errors={errors}
                listPlan={periodsPlans.value}
              />
            </Grid>
          </Grid>

          <Grid container mb={0} justifyContent="center">
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
        </Grid>
      </Form>
    </Grid>
  );
};
export default FormAddTask;

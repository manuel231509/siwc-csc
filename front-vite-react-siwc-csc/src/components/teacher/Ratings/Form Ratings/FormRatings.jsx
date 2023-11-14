import { Box, CircularProgress, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { descryptedText, encryptedText } from "../../../../CryptoJs/CryptoJs";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../LocalStorage/LocalStorage";
import { useTasksAssignedContext } from "../../../../context/Tasks/TasksProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad3";
import { useForm } from "../../../../hooks/useForm";
import {
  getAllPeriodsSort,
  getPeriodByDateNowSystem,
} from "../../../../services/period/PeriodService";
import {
  getDegreesAccordingToTeacher,
  getSubjectsByIdNumberTeacherAndIdDegree,
} from "../../../../services/teacher/TeacherService";
import FieldsControl from "../../../fields/FieldsControl";
import validate from "../../../fields/field validation/validate";
import { FormStyled } from "../Styled/RatingsStyled";

const CircularProgressWithLabel = (props) => {
  return (
    <Box
      sx={{
        padding: 2,
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
};

const initialStateFields = {
  grades: "",
  periods: "",
  subjects: "",
};

const FormRatings = () => {
  const {
    jwt,
    bearer,
    session: { teacher: tch },
  } = useSelector((store) => store.ssession);

  const {
    periods,
    handleChangePeriods,
    loading,
    handleChangeLoadingPrev,
    subjects,
    handleChangeSubjects,
    degrees,
    handleChangeDegrees,
    select,
    handleChangeSelect,
  } = useTasksAssignedContext();

  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");
    setFieldValidate(!fieldValid);

    if (fieldsValues === fields) return fieldValid;
  };

  const { fields, handleChangeFields, handleChangeFields1, errors, setErrors } =
    useForm(initialStateFields, true, validateFields);

  const { callEndPoint } = useFetchAndLoad(handleChangeLoadingPrev);

  const handleClickFields = (nameField) => (e) => {
    e.preventDefault();
    if (validateFields()) {
      const value = e.target.dataset.value;
      const selectFormTasksRatings = getObjectLocalStorage("formtasksratings");
      saveLocalStorage("formtasksratings", {
        ...selectFormTasksRatings,
        [nameField]: encryptedText(value),
      });
      handleChangeSelect(nameField, value);
    }
  };

  const getApiDegreesAccordingToTeacher = async (
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getDegreesAccordingToTeacher(idNumberTeacher, jwt, bearer),
      "degrees_g",
      "degrees_l"
    );

  const getApiSubjectsByIdNumberTeacherAndIdDegree = async (
    idNumberTeacher,
    idDegree,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getSubjectsByIdNumberTeacherAndIdDegree(
        idNumberTeacher,
        idDegree,
        jwt,
        bearer
      ),
      "subjects_g",
      "subjects_l"
    );

  const getApiAllPeriods = async (arrayOrdre, jwt, bearer) =>
    await callEndPoint(
      getAllPeriodsSort(arrayOrdre, jwt, bearer),
      "tasks_ratings_periods_g",
      "tasks_ratings_periods_l"
    );

  const getApiPeriodByDateNowSystem = async (jwt, bearer) =>
    await callEndPoint(
      getPeriodByDateNowSystem(jwt, bearer),
      "periodbydatenow_g",
      "periodbydatenow_l"
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auxFields = { ...fields };
        const auxSelect = { ...select };

        const selectFormTasksRatings =
          getObjectLocalStorage("formtasksratings");

        const arrayOrdre = ["initialDate", "finalDate"];
        const { data: allPeriods } = await getApiAllPeriods(
          arrayOrdre,
          jwt,
          bearer
        );
        const { data: currentPeriod } = await getApiPeriodByDateNowSystem(
          jwt,
          bearer
        );
        auxFields.periods = currentPeriod.idPeriod;
        auxSelect.periods = currentPeriod.idPeriod;
        auxSelect.currentPeriod = currentPeriod;
        const filterAllPeriods = allPeriods.filter(
          (period) => period.finalDate <= currentPeriod.finalDate
        );
        handleChangePeriods("data", filterAllPeriods);
        handleChangeFields1("periods", auxSelect.periods, false);
        handleChangeSelect("periods", auxSelect.periods);
        handleChangeSelect("currentPeriod", auxSelect.currentPeriod);

        const { data: degreesAcorrdingTeach } =
          await getApiDegreesAccordingToTeacher(
            tch.idNumberTeacher,
            jwt,
            bearer
          );
        handleChangeDegrees("data", degreesAcorrdingTeach);
        if (!selectFormTasksRatings?.grades) {
          if (degreesAcorrdingTeach[0]) {
            auxFields.grades = degreesAcorrdingTeach[0]?.idDegree;
            auxSelect.grades = degreesAcorrdingTeach[0]?.idDegree;
          }
        } else {
          auxFields.grades = descryptedText(selectFormTasksRatings["grades"]);
          auxSelect.grades = descryptedText(selectFormTasksRatings["grades"]);
        }
        handleChangeFields1("grades", auxFields.grades, false);
        handleChangeSelect("grades", auxSelect.grades);

        const { data: subjectsAccordingToTeacherDegree } =
          await getApiSubjectsByIdNumberTeacherAndIdDegree(
            tch.idNumberTeacher,
            auxSelect.grades,
            jwt,
            bearer
          );
        handleChangeSubjects(subjectsAccordingToTeacherDegree);
        if (!selectFormTasksRatings?.subjects) {
          if (subjectsAccordingToTeacherDegree[0]) {
            auxFields.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
            auxSelect.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
          }
        } else {
          auxFields.subjects = descryptedText(
            selectFormTasksRatings["subjects"]
          );
          auxSelect.subjects = descryptedText(
            selectFormTasksRatings["subjects"]
          );
        }
        handleChangeFields1("subjects", auxSelect.subjects, false);
        handleChangeSelect("subjects", auxSelect.subjects);

        saveLocalStorage("formtasksratings", {
          ...selectFormTasksRatings,
          ["periods"]: encryptedText(auxSelect.periods),
          ["grades"]: encryptedText(auxSelect.grades),
          ["subjects"]: encryptedText(auxSelect.subjects),
        });
      } catch (error) {
        console.log("Error fetchData -> ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container mb={2} justifyContent="center" alignContent="center">
      <FormStyled>
        {!loading["tasks_ratings_periods_g"] &&
        !loading["periodbydatenow_g"] ? (
          <FieldsControl.FieldPeriod
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            handleClickFields={handleClickFields}
            listPeriods={periods.data}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={55} />
        )}
        {!loading["degrees_g"] &&
        !loading["tasks_ratings_periods_g"] &&
        !loading["periodbydatenow_g"] ? (
          <FieldsControl.FieldGrades
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            handleClickFields={handleClickFields}
            listGrades={degrees.data}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={55} />
        )}
        {!loading["subjects_g"] &&
        !loading["degrees_g"] &&
        !loading["tasks_ratings_periods_g"] &&
        !loading["periodbydatenow_g"] ? (
          <FieldsControl.FieldSubjects
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            handleClickFields={handleClickFields}
            listSubjects={subjects}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={55} />
        )}
        {(loading["subjects_g"] ||
          loading["degrees_g"] ||
          loading["tasks_ratings_periods_g"] ||
          loading["periodbydatenow_g"]) && (
          <CircularProgressWithLabel /* value={progress} */ disableShrink />
        )}
      </FormStyled>
    </Grid>
  );
};

export default FormRatings;

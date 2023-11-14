import { Box, CircularProgress, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { descryptedText, encryptedText } from "../../../../CryptoJs/CryptoJs";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../LocalStorage/LocalStorage";
import { useTeacherContext } from "../../../../context/Teacher/TeacherProvider";
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
import { AchievementsSyled } from "../Styled/AchievementsSyled";

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

const FormAchievements = () => {
  const {
    jwt,
    bearer,
    session: { teacher: tch },
  } = useSelector((store) => store.ssession);

  const {
    periods,
    handleChangePeriods,
    degrees,
    handleChangeDegrees1,
    subjects,
    handleChangeSubjects,
    select,
    handleChangeSelect,
    loading,
    handleChangeLoading,
  } = useTeacherContext();

  const { callEndPoint } = useFetchAndLoad(handleChangeLoading);

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

  const handleClickFields = (nameField) => (e) => {
    e.preventDefault();
    if (validateFields()) {
      const value = e.target.dataset.value;
      const selectFormAchievements = getObjectLocalStorage("formachievements");
      saveLocalStorage("formachievements", {
        ...selectFormAchievements,
        [nameField]: encryptedText(value),
      });
      handleChangeSelect(nameField, value);
    }
  };

  const getApiAllPeriods = async (arrayOrdre, jwt, bearer) =>
    await callEndPoint(
      getAllPeriodsSort(arrayOrdre, jwt, bearer),
      "achievements_periods_g",
      "achievements_periods_l"
    );

  const getApiPeriodByDateNowSystem = async (jwt, bearer) =>
    await callEndPoint(
      getPeriodByDateNowSystem(jwt, bearer),
      "achievements_periodbydatenow_g",
      "achievements_periodbydatenow_l"
    );

  const getApiDegreesAccordingToTeacher = async (
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getDegreesAccordingToTeacher(idNumberTeacher, jwt, bearer),
      "achievements_degrees_g",
      "achievements_degrees_l"
    );

  const getApiSubjectsByTeacherAndDegree = async (
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
      "achievements_subjects_g",
      "achievements_subjects_l"
    );

  useEffect(() => {
    const fetchData = async () => {
      const auxFields = { ...fields };
      const auxSelect = { ...select };

      const selectFormAchievements = getObjectLocalStorage("formachievements");

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
      handleChangeFields1("periods", auxFields.periods, false);
      handleChangeSelect("periods", auxSelect.periods);
      handleChangeSelect("currentPeriod", auxSelect.currentPeriod);

      const { data: degreesAccordingTeach } =
        await getApiDegreesAccordingToTeacher(tch.idNumberTeacher, jwt, bearer);
      handleChangeDegrees1("data", degreesAccordingTeach);
      if (!selectFormAchievements?.grades) {
        if (degreesAccordingTeach[0]) {
          auxFields.grades = degreesAccordingTeach[0].idDegree;
          auxSelect.grades = degreesAccordingTeach[0].idDegree;
        }
      } else {
        auxFields.grades = descryptedText(selectFormAchievements["grades"]);
        auxSelect.grades = descryptedText(selectFormAchievements["grades"]);
      }
      handleChangeFields1("grades", auxFields.grades, false);
      handleChangeSelect("grades", auxSelect.grades);

      const { data: subjectsAccordingToTeacherDegree } =
        await getApiSubjectsByTeacherAndDegree(
          tch.idNumberTeacher,
          auxSelect.grades,
          jwt,
          bearer
        );
      handleChangeSubjects("data", subjectsAccordingToTeacherDegree);
      if (!selectFormAchievements?.subjects) {
        if (subjectsAccordingToTeacherDegree[0]) {
          auxFields.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
          auxSelect.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
        }
      } else {
        auxFields.subjects = descryptedText(selectFormAchievements["subjects"]);
        auxSelect.subjects = descryptedText(selectFormAchievements["subjects"]);
      }
      handleChangeFields1("subjects", auxFields.subjects, false);
      handleChangeSelect("subjects", auxSelect.subjects);

      saveLocalStorage("formachievements", {
        ...selectFormAchievements,
        ["periods"]: encryptedText(auxSelect.periods),
        ["grades"]: encryptedText(auxSelect.grades),
        ["subjects"]: encryptedText(auxSelect.subjects),
      });
    };
    fetchData();
  }, []);

  return (
    <Grid container mb={2} justifyContent={"center"} alignContent={"center"}>
      <AchievementsSyled>
        {!loading["achievements_periods_g"] &&
        !loading["achievements_periodbydatenow_g"] ? (
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
        {!loading["achievements_degrees_g"] &&
        !loading["achievements_periods_g"] &&
        !loading["achievements_periodbydatenow_g"] ? (
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
        {!loading["achievements_subjects_g"] &&
          !loading["achievements_degrees_g"] &&
          !loading["achievements_periods_g"] &&
          !loading["achievements_periodbydatenow_g"] && (
            <FieldsControl.FieldSubjects
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              handleClickFields={handleClickFields}
              listSubjects={subjects.data}
            />
          )}

        {(loading["achievements_subjects_g"] ||
          loading["achievements_degrees_g"] ||
          loading["achievements_periods_g"] ||
          loading["achievements_periodbydatenow_g"]) && (
          <CircularProgressWithLabel /* value={progress} */ disableShrink />
        )}
      </AchievementsSyled>
    </Grid>
  );
};
export default FormAchievements;

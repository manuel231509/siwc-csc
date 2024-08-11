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
import { FormStyled } from "../Styled/AchievementsSyled";

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
      const subject = subjects.data
        .filter((subject) => subject.idSubject === value)
        .reduce(
          (result, item) => ({
            nameSubjects: encryptedText(item.nameSubject),
          }),
          {}
        );
      const degree = degrees.data
        .filter((degree) => degree.idDegree === value)
        .reduce(
          (result, item) => ({
            nameDegrees: encryptedText(item.nameDegree),
          }),
          {}
        );

      console.log("====================================");
      console.log("nameDegree:", degree, "nameSubject: ", subject);
      console.log("====================================");

      const selectFormAchievements = getObjectLocalStorage("formachievements");
      const formAchievements = {
        ...selectFormAchievements,
        [nameField]: encryptedText(value),
        ...degree,
        ...subject,
      };
      saveLocalStorage("formachievements", formAchievements);

      handleChangeSelect(nameField, value);
      handleChangeSelect(
        "nameDegrees",
        descryptedText(formAchievements?.nameDegrees)
      );
      handleChangeSelect(
        "nameSubjects",
        descryptedText(formAchievements?.nameSubjects)
      );
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
          auxSelect.degrees = degreesAccordingTeach[0].idDegree;
          auxSelect.nameDegrees = degreesAccordingTeach[0].nameDegree;
        }
      } else {
        if (selectFormAchievements["degrees"]) {
          auxFields.grades = descryptedText(selectFormAchievements["degrees"]);
          auxSelect.degrees = descryptedText(selectFormAchievements["degrees"]);
        } else {
          auxFields.grades = degreesAccordingTeach[0].idDegree;
          auxSelect.degrees = degreesAccordingTeach[0].idDegree;
          auxSelect.nameDegrees = degreesAccordingTeach[0].nameDegree;
        }
        if (selectFormAchievements["nameDegrees"]) {
          auxSelect.nameDegrees = descryptedText(
            selectFormAchievements["nameDegrees"]
          );
        } else {
          auxSelect.nameDegrees = degreesAccordingTeach[0].nameDegree;
        }
      }
      handleChangeFields1("grades", auxFields.grades, false);
      handleChangeSelect("degrees", auxSelect.degrees);
      handleChangeSelect("nameDegrees", auxSelect.nameDegrees);

      const { data: subjectsAccordingToTeacherDegree } =
        await getApiSubjectsByTeacherAndDegree(
          tch.idNumberTeacher,
          auxSelect.degrees,
          jwt,
          bearer
        );
      handleChangeSubjects("data", subjectsAccordingToTeacherDegree);
      if (!selectFormAchievements?.subjects) {
        if (subjectsAccordingToTeacherDegree[0]) {
          auxFields.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
          auxSelect.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
          auxSelect.nameSubjects =
            subjectsAccordingToTeacherDegree[0]?.nameSubject;
        }
      } else {
        if (selectFormAchievements["subjects"]) {
          auxFields.subjects = descryptedText(
            selectFormAchievements["subjects"]
          );
          auxSelect.subjects = descryptedText(
            selectFormAchievements["subjects"]
          );
        } else {
          auxFields.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
          auxSelect.subjects = subjectsAccordingToTeacherDegree[0]?.idSubject;
        }
        if (selectFormAchievements["nameSubjects"]) {
          console.log(descryptedText(selectFormAchievements["nameSubjects"]));
          auxSelect.nameSubjects = descryptedText(
            selectFormAchievements["nameSubjects"]
          );
        } else {
          auxSelect.nameSubjects =
            subjectsAccordingToTeacherDegree[0]?.nameSubject;
        }
      }
      handleChangeFields1("subjects", auxFields.subjects, false);
      handleChangeSelect("subjects", auxSelect.subjects);
      handleChangeSelect("nameSubjects", auxSelect.nameSubjects);

      saveLocalStorage("formachievements", {
        ...selectFormAchievements,
        ["periods"]: encryptedText(auxSelect.periods),
        ["degrees"]: encryptedText(auxSelect.degrees),
        ["nameDegrees"]: encryptedText(auxSelect.nameDegrees),
        ["subjects"]: encryptedText(auxSelect.subjects),
        ["nameSubjects"]: encryptedText(auxSelect.nameSubjects),
      });
    };
    fetchData();
  }, []);

  return (
    <Grid container mb={2} justifyContent={"center"} alignContent={"center"}>
      <FormStyled>
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
      </FormStyled>
    </Grid>
  );
};
export default FormAchievements;

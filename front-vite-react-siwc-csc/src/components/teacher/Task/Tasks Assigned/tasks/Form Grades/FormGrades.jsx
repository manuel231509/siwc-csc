import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../../hooks/useFetchAndLoad1";
import { useForm } from "../../../../../../hooks/useForm";
import {
  getAllPeriods,
  getAllPeriodsSort,
  getPeriodByDateNowSystem,
} from "../../../../../../services/period/PeriodService";
import {
  getDegreesAccordingToTeacher,
  getSubjectsByIdNumberTeacherAndIdDegree,
} from "../../../../../../services/teacher/TeacherService";
import FieldsControl from "../../../../../fields/FieldsControl";
import validate from "../../../../../fields/field validation/validate";
import { FormStyled } from "../Styled/TasksCardsStyled";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../../../LocalStorage/LocalStorage";
import {
  descryptedText,
  encryptedText,
} from "../../../../../../CryptoJs/CryptoJs";

const initialStateFields = {
  grades: "",
  periods: "",
};

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

const FormGrades = () => {
  const { handleChangeSubjects, loading, periods, handleChangePeriods } =
    useTasksAssignedContext();

  const { select, handleChangeSelect, handleChangeSelect1 } =
    useTeacherContext();

  const { callEndPoint } = useFetchAndLoad();

  const getApiDegreesAccordingToTeacher = async (
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getDegreesAccordingToTeacher(idNumberTeacher, jwt, bearer),
      "degrees"
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
      "subjects"
    );

  const getApiAllPeriods = async (arrayOrdre, jwt, bearer) =>
    await callEndPoint(getAllPeriodsSort(arrayOrdre, jwt, bearer), "periods");

  const getApiPeriodByDateNowSystem = async (jwt, bearer) =>
    await callEndPoint(
      getPeriodByDateNowSystem(jwt, bearer),
      "periodbydatenow"
    );

  const ssessionState = useSelector((store) => store.ssession);

  const { jwt, bearer, session } = ssessionState;

  const { teacher } = session;

  const validateFields = (fieldsValues = fields) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    if (fieldsValues === fields) {
      return Object.values(tempErrors).every((v) => v === "");
    }
  };

  const {
    fields,
    handleChangeFields,
    handleChangeFields1,
    handleChangeFields2,
    errors,
    setErrors,
  } = useForm(initialStateFields, true, validateFields);

  const handleClickFields = (nameFields) => (e) => {
    e.preventDefault();
    if (validateFields()) {
      const value = e.target.dataset.value;

      if (nameFields === "grades") {
        setProgress(0);
        getApiSubjectsByIdNumberTeacherAndIdDegree(
          teacher.idNumberTeacher,
          value,
          jwt,
          bearer
        )
          .then(({ data }) => {
            handleChangeSubjects(data);
          })
          .catch((error) => {
            console.log("error subjects: ", error);
          });
      }
      const selectFromGrades = getObjectLocalStorage("formgrades");
      handleChangeSelect(nameFields, value);
      saveLocalStorage("formgrades", {
        ...selectFromGrades,
        [nameFields]: encryptedText(value),
      });
    }
  };

  const [degrees, setDegrees] = useState({
    data: [],
    error: {},
  });

  const handleChangeDegrees = (nameField, value) => {
    setDegrees({ ...degrees, [nameField]: value });
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auxFields = { ...fields };
        const auxSelect = { ...select };
        const selectFormGrades = getObjectLocalStorage("formgrades");

        //START OF FIELD PERIOD
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
        const filterAllPeriods = allPeriods.filter(
          (period) => period.finalDate <= currentPeriod.finalDate
        );
        handleChangePeriods("data", filterAllPeriods);
        auxFields.periods = currentPeriod.idPeriod;
        auxSelect.periods = currentPeriod.idPeriod;
        saveLocalStorage("formgrades", {
          ...selectFormGrades,
          ["periods"]: encryptedText(currentPeriod.idPeriod),
        });
        handleChangeFields2(auxFields);
        handleChangeSelect1(auxSelect);
        //END OF FIELD PERIOD

        //START OF FIELD DEGREES
        const { data: degreesAcorrdingTeach } =
          await getApiDegreesAccordingToTeacher(
            teacher.idNumberTeacher,
            jwt,
            bearer
          );
        handleChangeDegrees("data", degreesAcorrdingTeach);

        if (!selectFormGrades?.grades) {
          if (degreesAcorrdingTeach[0]) {
            auxFields.grades = degreesAcorrdingTeach[0]?.idDegree;
            auxSelect.grades = degreesAcorrdingTeach[0]?.idDegree;
          }
        } else {
          auxFields.grades = descryptedText(selectFormGrades["grades"]);
          auxSelect.grades = descryptedText(selectFormGrades["grades"]);
          handleChangeFields2(auxFields);
          handleChangeSelect1(auxSelect);
        }
        //END OF FIELD DEGREES

        const { data: subjectsAccordingTeacherAndDegree } =
          await getApiSubjectsByIdNumberTeacherAndIdDegree(
            teacher.idNumberTeacher,
            auxSelect.grades,
            jwt,
            bearer
          );
        handleChangeSubjects(subjectsAccordingTeacherAndDegree);
      } catch (error) {
        console.log("Error fetchData -> ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container mb={2} justifyContent={"center"} alignContent={"center"}>
      <FormStyled>
        {!loading.periods && !loading["periodbydatenow"] ? (
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
        {!loading.periods && !loading["periodbydatenow"] && !loading.degrees ? (
          <FieldsControl.FieldGrades
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            handleClickFields={handleClickFields}
            listGrades={degrees.data}
            select={select}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={55} />
        )}
        {loading.subjects && (
          <CircularProgressWithLabel /* value={progress} */ disableShrink />
        )}
      </FormStyled>
    </Grid>
  );
};
export default FormGrades;

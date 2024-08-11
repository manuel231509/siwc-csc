import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  descryptedText,
  encryptedText,
} from "../../../../../../CryptoJs/CryptoJs";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../../../LocalStorage/LocalStorage";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import { useTeacherContext } from "../../../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../../../hooks/useFetchAndLoad3";
import { useForm } from "../../../../../../hooks/useForm";
import {
  getAllPeriodsSort,
  getPeriodByDateNowSystem,
} from "../../../../../../services/period/PeriodService";
import {
  getDegreesAccordingToTeacher,
  getSubjectsByIdNumberTeacherAndIdDegree,
} from "../../../../../../services/teacher/TeacherService";
import FieldsControl from "../../../../../fields/FieldsControl";
import validate from "../../../../../fields/field validation/validate";
import { sweetAlert } from "../../../../../../sweetAlert2/SweetAlert";
import Swal from "sweetalert2";

const FormStyled = lazy(() =>
  import("../Styled/TasksCardsStyled").then((module) => ({
    default: module.FormStyled,
  }))
);

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
  const {
    handleChangeSubjects,
    periods,
    handleChangePeriods,
    degrees,
    handleChangeDegrees,
    handleChangeLoading,
  } = useTasksAssignedContext();

  const { select, handleChangeSelect, handleChangeSelect1 } =
    useTeacherContext();

  const { loading, callEndPoint } = useFetchAndLoad(handleChangeLoading);

  const getApiDegreesAccordingToTeacher = async (
    idNumberTeacher,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getDegreesAccordingToTeacher(idNumberTeacher, jwt, bearer),
      "gdegrees",
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
      "gsubjects",
      "subjects"
    );

  const getApiAllPeriods = async (arrayOrdre, jwt, bearer) =>
    await callEndPoint(
      getAllPeriodsSort(arrayOrdre, jwt, bearer),
      "gperiods",
      "periods"
    );

  const getApiPeriodByDateNowSystem = async (jwt, bearer) =>
    await callEndPoint(
      getPeriodByDateNowSystem(jwt, bearer),
      "gperiodbydatenow",
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

  const { fields, handleChangeFields, handleChangeFields2, errors, setErrors } =
    useForm(initialStateFields, true, validateFields);

  const handleClickFields = (nameFields) => (e) => {
    e.preventDefault();
    if (validateFields()) {
      const value = e.target.dataset.value;

      if (nameFields === "grades") {
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
        sweetAlert({
          position: "center",
          icon: "error",
          title: "",
          text:
            error.response?.data === undefined
              ? error.message.toUpperCase()
              : error.response?.data?.message?.includes("JWT expired")
              ? "SESSION EXPIRED."
              : error.response?.data?.message !== undefined
              ? error.response?.data?.message?.toUpperCase()
              : error.message.toUpperCase(),
          showCancelButton: false,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
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
        {(loading.periods ||
          loading["periodbydatenow"] ||
          loading.degrees ||
          loading.subjects) && <CircularProgressWithLabel disableShrink />}
      </FormStyled>
    </Grid>
  );
};
export default FormGrades;

import { Grid, Skeleton } from "@mui/material";
import React from "react";
import { FormStyled } from "./Styled/FormSubjectsStyled";
import FieldsControl from "../../../../fields/FieldsControl";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useFetchAndLoad from "../../../../../hooks/useFetchAndLoad2";
import { getSubjectsIdDegreeStudent } from "../../../../../services/subject/SubjectService";
import { useStudentContext } from "../../../../../context/Student/StudentProvider";
import { useForm } from "../../../../../hooks/useForm";
import validate from "../../../../fields/field validation/validate";
import {
  descryptedText,
  encryptedText,
} from "../../../../../CryptoJs/CryptoJs";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../../LocalStorage/LocalStorage";
import { getByIdNumberTeacher } from "../../../../../services/teacher/TeacherService";

const initialStateFields = {
  subjects: { idNumberTeacher: "", idSubject: "", nameSubject: "" },
};

const FormSubjects = () => {
  const { session, jwt, bearer } = useSelector((store) => store.ssession);

  const { loading, callEndPoint } = useFetchAndLoad();

  const {
    subjects,
    handleChangeSubjects,
    handleChangeSelect1,
    handleChangeSelect,
    select,
  } = useStudentContext();

  const { student } = session;

  const getApiSubjectsIdDegreeStudent = async (idDegree, jwt, bearer) =>
    await callEndPoint(
      getSubjectsIdDegreeStudent(idDegree, jwt, bearer),
      "subjects",
      "subjects"
    );

  const validateFields = (fieldsValues = fields) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    if (fieldsValues === fields) {
      return Object.values(tempErrors).every((v) => v === "");
    }
  };

  const { fields, handleChangeFields, handleChangeFields1, errors, setErrors } =
    useForm(initialStateFields, true, validateFields);

  const getApiByIdNumberTeacher = async (idNumberTeacher, jwt, bearer) =>
    await callEndPoint(
      getByIdNumberTeacher(idNumberTeacher, jwt, bearer),
      "teacher",
      "teacher"
    );

  const handleClickFields = (nameFields) => (e) => {
    e.preventDefault();
    const value = e.target.dataset.value;
    if (validateFields()) {
      const selectSubject = subjects.filter(
        (subject) => subject.idSubject === value
      )[0];
      delete selectSubject.degreeSubjectEntitys;
      const selectFormSubjects = {
        idSubject: encryptedText(selectSubject.idSubject),
        nameSubject: encryptedText(selectSubject.nameSubject),
        idNumberTeacher: encryptedText(String(selectSubject.idNumberTeacher)),
      };
      saveLocalStorage("formsubject", selectFormSubjects);
      handleChangeSelect(nameFields, selectSubject);
    }
  };

  useEffect(() => {
    getApiSubjectsIdDegreeStudent(student.idDegree, jwt, bearer)
      .then(({ data }) => handleChangeSubjects(data))
      .catch((error) => console.log("error -> ", error))
      .finally(() => {
        if (getObjectLocalStorage("formsubject")) {
          const formsubject = getObjectLocalStorage("formsubject");
          handleChangeFields1(
            "subjects",
            descryptedText(formsubject?.idSubject)
          );
          handleChangeSelect1({
            ...select,
            ["subjects"]: {
              idSubject: descryptedText(formsubject.idSubject),
              nameSubject: descryptedText(formsubject.nameSubject),
              idNumberTeacher: Number(
                descryptedText(formsubject.idNumberTeacher)
              ),
            },
          });
        }
      });
  }, [student.idDegree, jwt, bearer]);

  useEffect(() => {
    if (select.subjects.idNumberTeacher) {
      getApiByIdNumberTeacher(select.subjects.idNumberTeacher, jwt, bearer)
        .then(({ data }) => {
          delete data.subjectEntitys;
          handleChangeSelect1({ ...select, ["teacher"]: data });
        })
        .catch((error) => console.log("error -> ", error));
    }
  }, [fields.subjects]);

  return (
    <Grid container mb={2} justifyContent={"center"} alignContent={"center"}>
      <FormStyled>
        {!loading["subjects"] ? (
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
      </FormStyled>
    </Grid>
  );
};

export default FormSubjects;

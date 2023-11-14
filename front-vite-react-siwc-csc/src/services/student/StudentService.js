import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getStudentByIdDegree = (degreeId, jwt, bearer) => {
  console.log("idDegree:  ", degreeId);
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(`${url}/student/find-students-byIdDegree/${degreeId}`, {
      signal: controller.signal,
      ...config,
    }),
  };
};

// 'Access-Control-Allow-Origin' : '*',
// 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',

const getStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher = (
  idDegree,
  idSubject,
  idNumberTeacher,
  jwt,
  bearer
) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(
      `${url}/student/find-students-byIdDegreeAndIdSubjectAndIdNumberTeacher/${idDegree}/${idSubject}/${idNumberTeacher}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
  };
};

const getStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher = (
  idPeriod,
  idDegree,
  idSubject,
  idNumberTeacher,
  jwt,
  bearer
) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(
      `${url}/student/find-students-byIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher/${idPeriod}/${idDegree}/${idSubject}/${idNumberTeacher}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
  };
};

const getStudentsByIdNumberTeacherAndIdTask = (
  idNumberTeacher,
  idTask,
  jwt,
  bearer
) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(
      `${url}/student/find-students-byIdNumberTeacherAndIdTask/${idNumberTeacher}/${idTask}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

export {
  getStudentByIdDegree,
  getStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher,
  getStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher,
  getStudentsByIdNumberTeacherAndIdTask,
};

import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getTasksByIdNumberStudentAndIdSubjectAndCurrentDate = (
  idNumberStudent,
  idSubject,
  boolLimit,
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
      `${url}/task/find-tasks-byIdNumberStudentAndIdSubjectAndCurrentDate/${idNumberStudent}/${idSubject}/${boolLimit}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

const getTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher = (
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
      `${url}/task/find-tasks-byIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher/${idPeriod}/${idDegree}/${idSubject}/${idNumberTeacher}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
  };
};

export {
  getTasksByIdNumberStudentAndIdSubjectAndCurrentDate,
  getTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher,
};

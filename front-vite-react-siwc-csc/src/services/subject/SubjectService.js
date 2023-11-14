import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getSubjectsIdDegreeStudent = (idDegree, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(
      `${url}/subject/find-subjects-byIdDegreeStudent/${idDegree}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

const getSubjectsByIdNumberStudent = (idNumberStudent, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      Authorization: `${bearer} ${jwt}`,
      "Content-Type": "application/json",
    },
  };
  return {
    call: axios.get(
      `${url}/subject/find-subjects-byIdNumberStudent/${idNumberStudent}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

export { getSubjectsIdDegreeStudent, getSubjectsByIdNumberStudent };

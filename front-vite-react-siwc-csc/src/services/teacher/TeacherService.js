import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getAllTeacher = (jwt, bearer) => {
  const controller = loadAbort();
  console.log("JSON WEB TOKEN: ", `${bearer} ${jwt}`);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
    timeout: 20000,
  };
  return {
    call: axios.get(`${url}/teacher/all-teacher`, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

const getByIdNumberTeacher = (idNumberTeacher, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(`${url}/teacher/find-teacher-byId/${idNumberTeacher}`, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

const getDegreesAccordingToTeacher = (idNumberTeacher, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(
      `${url}/teacher/degrees-according-to-teacher/${idNumberTeacher}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

const instance = axios.create({
  baseURL: url,
  timeout: 20000,
});

const getSubjectsByIdNumberTeacherAndIdDegree = (
  idNumberTeacher,
  idDegree,
  jwt,
  bearer,
  otherConfig
) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: instance.get(
      `/teacher/find-subjects-byIdNumberTeacherAndIdDegree/${idNumberTeacher}/${idDegree}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

export {
  getAllTeacher,
  getDegreesAccordingToTeacher,
  getSubjectsByIdNumberTeacherAndIdDegree,
  getByIdNumberTeacher,
  axios,
};

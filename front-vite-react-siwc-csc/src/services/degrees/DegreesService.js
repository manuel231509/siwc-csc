import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getByIdDegree = (idDegree, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(`${url}/degree/find-degree-byId/${idDegree}`, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

export { getByIdDegree };

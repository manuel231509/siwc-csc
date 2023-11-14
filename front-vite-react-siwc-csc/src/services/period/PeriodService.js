import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getAllPeriods = (jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
    onDownloadProgress: (progressEvent) => {
      console.log("all periods: ", progressEvent.total);
      console.log("all periods: ", progressEvent.loaded);
    },
  };
  return {
    call: axios.get(`${url}/period/all-periods`, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};
const getAllPeriodsSort = (arrayOrdre, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.post(`${url}/period/all-periods-sort`, arrayOrdre, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

const getPeriodByDateNowSystem = (jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.get(`${url}/period/find-period-byDateNowSystem`, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

export { getAllPeriods, getAllPeriodsSort, getPeriodByDateNowSystem };

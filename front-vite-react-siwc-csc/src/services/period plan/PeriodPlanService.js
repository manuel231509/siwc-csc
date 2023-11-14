import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const getPeriodsPlansByIdPeriodAndSubectAndDegree = (
  idPeriod,
  idSubject,
  idDegree,
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
      `${url}/period-plan/find-periods-plans-byIdPeriodAndSubjectAndDegree/${idPeriod}/${idSubject}/${idDegree}/${idNumberTeacher}`,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

const savePeriodPlanTask = (periodPlanTask, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };
  return {
    call: axios.post(
      `${url}/period-plan/save-period-plan-task`,
      periodPlanTask,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

export { getPeriodsPlansByIdPeriodAndSubectAndDegree, savePeriodPlanTask };

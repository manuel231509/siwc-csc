import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const loginSession = (ssession) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "https://api-siwc-csc.duckdns.org/",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    },
  };
  return {
    call: axios.post(`${url}/auth/login`, ssession, {
      signal: controller.signal,
      ...config,
    }),
    controller,
  };
};

const saveSession = (ssession) => {
  const controller = loadAbort();
  return {
    call: axios.post(`${url}/auth/login/register-session`, ssession, {
      signal: controller.signal,
    }),
    controller,
  };
};

export { saveSession, loginSession };

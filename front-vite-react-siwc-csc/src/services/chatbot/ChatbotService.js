import axios from "axios";
import { loadAbort } from "../LoadAbort";

export const getPredictChatbot = (mesg) => {
  const controller = loadAbort();
  const config = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return {
    call: axios.post(
      "http://127.0.0.1:5000/predict",
      { message: mesg.message },
      {
        ...config,
        signal: controller.signal,
      }
    ),
    controller,
  };
};

import axios from "axios";
import { loadAbort } from "../LoadAbort";
import { url } from "../Url";

const updateDateDeliveredAndTaskDelivered = (publishedTask, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };

  return {
    call: axios.post(
      `${url}/published-task/update-date_delivered-task_delivered`,
      publishedTask,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};
const updateNoteAndCommentTeacher = (publishedTask, jwt, bearer) => {
  const controller = loadAbort();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${bearer} ${jwt}`,
    },
  };

  return {
    call: axios.post(
      `${url}/published-task/update-note-comment_teacher`,
      publishedTask,
      {
        signal: controller.signal,
        ...config,
      }
    ),
    controller,
  };
};

export { updateDateDeliveredAndTaskDelivered, updateNoteAndCommentTeacher };

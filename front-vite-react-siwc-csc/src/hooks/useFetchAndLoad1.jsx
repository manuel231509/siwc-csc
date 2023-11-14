import { useEffect, useState } from "react";
import { useTasksAssignedContext } from "../context/Tasks/TasksProvider";
import { useStudentContext } from "../context/Student/StudentProvider";

const useFetchAndLoad = () => {
  const [nameFieldLoading, setNameFieldLoading] = useState("");

  const { handleChangeLoading } = useTasksAssignedContext();
  const { handleChangeLoading1= handleChangeLoading } = useStudentContext();

  let controller = new AbortController();

  const callEndPoint = async (axiosCall, nameField) => {
    setNameFieldLoading(nameField);
    if (axiosCall.controller) controller = axiosCall.controller;
    handleChangeLoading(nameField, true);
    handleChangeLoading1(nameField, true);
    let result = {};
    try {
      result = await axiosCall.call;
    } catch (error) {
      handleChangeLoading(nameField, false);
      handleChangeLoading1(nameField, false);
      throw error;
    }
    handleChangeLoading(nameField, false);
    handleChangeLoading1(nameField, false);
    return result;
  };

  const cancelEndPoint = (nameField) => {
    handleChangeLoading(nameField, false);
    handleChangeLoading1(nameField, false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndPoint(nameFieldLoading);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { callEndPoint };
};

export default useFetchAndLoad;

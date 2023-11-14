import { useEffect, useState } from "react";
import { useStudentContext } from "../context/Student/StudentProvider";

const useFetchAndLoad = () => {
  const [nameFieldLoading, setNameFieldLoading] = useState("");
  const [nameFieldLoading1, setNameFieldLoading1] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const { loading, handleChangeLoading } = useStudentContext();

  let controller = new AbortController();

  const callEndPoint = async (axiosCall, nameField, nameField1) => {
    setNameFieldLoading(nameField);
    setNameFieldLoading1(nameField1);

    if (axiosCall.controller) controller = axiosCall.controller;
    handleChangeLoading(!nameField1 ? nameField : nameField1, true);
    setLoadingLocal({
      ...loading,
      [!nameField1 ? nameField : nameField1]: true,
    });
    let result = {};
    try {
      result = await axiosCall.call;
    } catch (error) {
      handleChangeLoading(!nameField1 ? nameField : nameField1, false);
      setLoadingLocal({
        ...loading,
        [!nameField1 ? nameField : nameField1]: false,
      });
      throw error;
    }
    handleChangeLoading(!nameField1 ? nameField : nameField1, false);
    setLoadingLocal({
      ...loading,
      [!nameField1 ? nameField : nameField1]: false,
    });
    return result;
  };

  const cancelEndPoint = (nameField, nameField1) => {
    console.log("cancelEndPoint: ", !nameField1 ? nameField : nameField1);
    if (controller) {
      handleChangeLoading(!nameField1 ? nameField : nameField1, false);
      setLoadingLocal({
        ...loading,
        [!nameField1 ? nameField : nameField1]: false,
      });
      controller.abort();
    }
  };

  useEffect(() => {
    return () => {
      cancelEndPoint(nameFieldLoading, nameFieldLoading1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading: loadingLocal, callEndPoint };
};

export default useFetchAndLoad;

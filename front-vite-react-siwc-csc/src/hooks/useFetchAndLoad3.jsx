import { useEffect, useState } from "react";

const useFetchAndLoad = (handleChangeLoading) => {
  const [nameFieldLoading, setNameFieldLoading] = useState("");
  const [nameFieldLoading1, setNameFieldLoading1] = useState("");
  const [loadingLocal, setLoadingLocal] = useState({});

  let controller = new AbortController();

  const callEndPoint = async (axiosCall, nameField, nameField1) => {
    if (Boolean(handleChangeLoading) && Boolean(nameField))
      setNameFieldLoading(nameField);
    setNameFieldLoading1(nameField1);

    if (axiosCall.controller) controller = axiosCall.controller;
    if (Boolean(handleChangeLoading) && Boolean(nameField))
      handleChangeLoading(nameField, true);
    setLoadingLocal((prev) => ({
      ...prev,
      [nameField1]: true,
    }));
    let result = {};
    try {
      result = await axiosCall.call;
    } catch (error) {
      if (Boolean(handleChangeLoading) && Boolean(nameField))
        handleChangeLoading(nameField, false);
      setLoadingLocal((prev) => ({
        ...prev,
        [nameField1]: false,
      }));
      throw error;
    }
    if (Boolean(handleChangeLoading) && Boolean(nameField))
      handleChangeLoading(nameField, false);
    setLoadingLocal((prev) => ({
      ...prev,
      [nameField1]: false,
    }));
    return result;
  };

  const cancelEndPoint = (nameField, nameField1) => {
    if (controller) {
      if (Boolean(handleChangeLoading) && Boolean(nameField))
        handleChangeLoading(nameField, false);
      setLoadingLocal((prev) => ({
        ...prev,
        [nameField1]: false,
      }));
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

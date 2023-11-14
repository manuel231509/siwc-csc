import { useEffect, useState } from "react";

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller = new AbortController();

  const callEndPoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {};
    try {
      result = await axiosCall.call;
    } catch (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
    return result;
  };

  const cancelEndPoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndPoint();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, callEndPoint };
};

export default useFetchAndLoad;

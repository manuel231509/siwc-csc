import { AxiosResponse } from "axios";
import { useEffect } from "react";

const useAsync = (
  asyncFn = () => Promise.resolve(AxiosResponse),
  successFunction = Function,
  returnFunction = Function,
  dependencies = []
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((result) => {
      if (isActive) successFunction(result);
    });
    return () => {
      returnFunction && returnFunction();
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useAsync;

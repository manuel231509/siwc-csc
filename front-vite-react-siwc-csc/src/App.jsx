import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
import { descryptedText } from "./CryptoJs/CryptoJs";
import useFetchAndLoad from "./hooks/useFetchAndLoad";
import { getObjectLocalStorage } from "./LocalStorage/LocalStorage";
import {
  createSessionInitial,
  modifyLoading,
} from "./redux/states/ssessionSlice";
import { Routers } from "./router/Routers";
import { loginSession } from "./services/session/SessionService";
import { sweetAlert } from "./sweetAlert2/SweetAlert";

const App = () => {
  const { callEndPoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getApiLogin = async () => {
      const ssession = getObjectLocalStorage("ssession");
      if (ssession) {
        try {
          const tempSsession = {
            username: descryptedText(ssession.username),
            password: descryptedText(ssession.password),
            jwt: descryptedText(ssession.jwt),
          };
          const { data } = await callEndPoint(loginSession(tempSsession));
          const role = data.authorities.find(
            (element) => element.authority === descryptedText(ssession.role)
          )?.authority;
          if (!!role) {
            delete data.authorities;
            Object.assign(data, {
              role: descryptedText(ssession.role),
              password: descryptedText(ssession.password),
            });
            dispatch(createSessionInitial(data));
            console.log("DATA:  ", data, "ssession: ", ssession);
          } else {
            sweetAlert({
              position: "center",
              icon: "error",
              title: "",
              text: `SORRY YOU ARE NOT A/AN ${descryptedText(ssession.role)
                .split("_")[1]
                .toUpperCase()}`,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 4000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            dispatch(modifyLoading(false));
          }
        } catch (error) {
          dispatch(modifyLoading(false));
          sweetAlert({
            position: "center",
            icon: "error",
            title: "",
            text:
              error.response?.data === undefined
                ? error.message.toUpperCase()
                : error.response?.data?.message?.includes("JWT expired")
                ? "SESSION EXPIRED."
                : error.response?.data?.message?.toUpperCase(),
            showCancelButton: false,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          if (error.response?.data?.message?.includes("JWT expired")) {
            navigate("/login", { replace: true });
          }
        }
        dispatch(modifyLoading(false));
      } else {
        navigate("/login", { replace: true });
      }
    };
    getApiLogin();
  }, []);

  return <Routers />;
};

export default App;

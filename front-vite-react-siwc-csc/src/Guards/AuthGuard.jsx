import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const ssessionState = useSelector((store) => store.ssession);
  const { username, password, loading } = ssessionState;
  return (
    <>
      {!loading ? (
        username !== "" && password !== "" ? (
          <Outlet />
        ) : (
          <Navigate replace to="/login" />
        )
      ) : username !== "" && password !== "" ? (
        <Navigate replace to="/login" />
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="success" />
        </Backdrop>
      )}
    </>
  );
};
export default AuthGuard;

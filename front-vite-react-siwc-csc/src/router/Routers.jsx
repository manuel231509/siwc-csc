import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "../Guards/AuthGuard";
import RoutersPrivate from "./Private/RoutersPrivate";

const Signup = lazy(() => import("../views/Sign Up/Signup"));
const Login = lazy(() => import("../views/Log In/Login"));
const NotFound = lazy(() => import("../components/not found/NotFound"));

const RoutesWithNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Routers = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate replace to={"private"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AuthGuard />}>
        <Route path={"private/*"} element={<RoutersPrivate />} />
      </Route>
    </RoutesWithNotFound>
  );
};

export { Routers, RoutesWithNotFound };

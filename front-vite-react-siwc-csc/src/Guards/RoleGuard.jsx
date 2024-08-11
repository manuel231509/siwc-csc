import { lazy } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const RoutesWithNotFound = lazy(() =>
  import("../router/Routers").then((module) => ({
    default: module.RoutesWithNotFound,
  }))
);

const RoleGuard = ({ rol }) => {
  const { role } = useSelector((store) => store.ssession);
  return role === rol ? <Outlet /> : <RoutesWithNotFound />;
};
export default RoleGuard;

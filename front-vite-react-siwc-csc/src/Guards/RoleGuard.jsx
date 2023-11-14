import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RoutesWithNotFound } from "../router/Routers";

const RoleGuard = ({ rol }) => {
  const { role } = useSelector((store) => store.ssession);
  return role === rol ? <Outlet /> : <RoutesWithNotFound />;
};
export default RoleGuard;

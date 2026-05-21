import { useAuthorized } from "@/tanstack/authTanstack";
import UnauthorizedPage from "./unauthorized";
import Loading from "./loading";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { data, isLoading } = useAuthorized();

  if (isLoading) {
    return <Loading />;
  }

  if (data?.status === 429) {
    return <Navigate to="/limit_page" replace />;
  }

  if (!data?.ok) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

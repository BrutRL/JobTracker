import { useAuthorized } from "@/tanstack/authTanstack";
import UnauthorizedPage from "./unauthorized";
import Loading from "./loading";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { data, isLoading } = useAuthorized();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.ok) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

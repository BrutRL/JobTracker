import { useAuthorized } from "@/tanstack/authTanstack";
import UnauthorizedPage from "./unauthorized";
import Loading from "./loading";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "sonner";

function ProtectedRoutes() {
  const { data, isLoading } = useAuthorized();

  if (isLoading) {
    return <Loading />;
  }

  if (data?.status === 429) {
    toast.error(data.message || "Too many requests");
    return <Navigate to="/limit_page" replace />;
  }

  if (!data?.ok) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

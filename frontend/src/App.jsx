import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import Loading from "./pages/authPages/loading";

const Login = lazy(() => import("./pages/authPages/login"));
const Register = lazy(() => import("./pages/authPages/register"));
const ReqResetPass = lazy(() => import("./pages/authPages/reqResetPass"));
const NotFoundPage = lazy(() => import("./pages/authPages/notFound"));
const Sidebar = lazy(() => import("./pages/mainPages/sidebar"));
const ResetPass = lazy(() => import("./pages/authPages/resetPassword"));
const ProtectedRoutes = lazy(() => import("./pages/authPages/protectedRoutes"));
const Profile = lazy(() => import("./pages/mainPages/profile"));
const Board = lazy(() => import("./pages/mainPages/board"));
const ErrorPage = lazy(() => import("./pages/authPages/errorPage"));
const TooManyRequest = lazy(() => import("./pages/authPages/tooManyRequest"));
const DashBoard = lazy(() => import("./pages/mainPages/dashboard"));
const Reminder = lazy(() => import("./pages/mainPages/reminder"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/req_reset_pass" element={<ReqResetPass />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/reset_pass" element={<ResetPass />} />
          <Route path="/limit_page" element={<TooManyRequest />} />
          <Route path="/user" element={<ProtectedRoutes />}>
            <Route path="/user" element={<Sidebar />}>
              <Route index element={<Navigate to="/user/board" replace />} />
              <Route path="board" element={<Board />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="reminders" element={<Reminder />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" theme="dark" richColors />
    </BrowserRouter>
  );
}

export default App;

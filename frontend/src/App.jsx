import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/authPages/login";
import Register from "./pages/authPages/register";
import ReqResetPass from "./pages/authPages/reqResetPass";
import NotFoundPage from "./pages/authPages/notFound";
import Loading from "./pages/authPages/loading";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset_pass" element={<ReqResetPass />} />
        <Route path="/not_found" element={<NotFoundPage />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;

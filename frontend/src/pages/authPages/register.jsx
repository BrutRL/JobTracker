import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, User, Shield, File, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { registerMutate } from "@/tanstack/authTanstack";
import { useState, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
export default function Register() {
  const register = registerMutate();
  const [confirmShowPass, setConfirmShowPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatarPath: "",
  });
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  });
  const registerFn = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (formData.password != formData.confirm_password) {
      return toast.error(`Password dont match`);
    }
    register.mutate(data, {
      onSuccess: () => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          avatarPath: "",
        });
      },
    });
  };

  const googleRegister = () => {
    try {
      window.location.href = import.meta.env.VITE_GOOGLE_REGISTER;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="bg-black w-full h-screen flex items-center justify-center p-5">
      <div className="sm:max-w-[440px] w-full bg-[#161B22] border-[0.5px] border-white/10 p-6 md:p-8 gap-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-2">
          <span className="text-[#F0A500]">JobQuest</span>
        </div>
        <h1 className="text-[26px] text-white text-center">
          Create your account.
        </h1>

        <div className="flex flex-col gap-4 mt-4">
          <Button
            onClick={googleRegister}
            type="button"
            className="w-full h-[44px] bg-white hover:bg-gray-100 text-gray-800 flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#161B22] px-2 text-[#6E7681]">
                or sign up with email
              </span>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={registerFn}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan dela Cruz"
                className="pl-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan.delacruz@gmail.com"
                className="pl-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
              <Input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="pl-10 pr-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <Eye className="w-4 h-4 text-[#6E7681] cursor-pointer" />
                ) : (
                  <EyeOff className="w-4 h-4 text-[#6E7681] cursor-pointer" />
                )}
              </span>
            </div>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
              <Input
                type={confirmShowPass ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
                className="pl-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                onClick={() => setConfirmShowPass(!confirmShowPass)}
              >
                {confirmShowPass ? (
                  <Eye className="w-4 h-4 text-[#6E7681] cursor-pointer" />
                ) : (
                  <EyeOff className="w-4 h-4 text-[#6E7681] cursor-pointer" />
                )}
              </span>
            </div>
            <div className="relative">
              <File className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
              <Input
                type="file"
                name="avatarPath"
                accept="image/*"
                onChange={handleChange}
                className="pl-10 pt-2 bg-[#21262D] border-none h-[44px]  text-[#6E7681] file:text-[#6E7681] file:bg-[#21262D] file:border-none file:rounded-md file:px-1 file:py-1 file:cursor-pointer"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={register.isPending}
              className="w-full h-[44px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] mt-2"
            >
              {register.isPending ? <Spinner /> : " Create account"}
            </Button>
          </form>

          <div className="text-center text-[11px] text-[#6E7681]">
            By signing up, you agree to our{" "}
            <a href="#" className="text-[#F0A500] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#F0A500] hover:underline">
              Privacy Policy
            </a>
          </div>

          <div className="text-center text-[13px] text-[#6E7681]">
            Already have an account?{" "}
            <Link className="text-[#F0A500] hover:underline" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

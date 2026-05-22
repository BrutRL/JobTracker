import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { resetPassMutate } from "@/tanstack/authTanstack";
import { toast } from "sonner";

export default function ResetPass() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const resetPass = resetPassMutate();

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password != formData.confirm_password) {
      return toast.error(`Password dont match`);
    }
    resetPass.mutate({ data: formData, id: userId });
  };

  return (
    <main className="bg-black w-full h-screen flex items-center justify-center p-5">
      <div className="sm:max-w-[440px] w-full bg-[#161B22] border-[0.5px] border-white/10 p-6 md:p-8 gap-6 rounded-lg flex flex-col gap-6">
        <div>
          <div className="text-center mb-2">
            <span className="text-[#F0A500]">JobQuest</span>
          </div>
          <h1 className="text-[26px] text-white text-center">Reset password</h1>
          <p className="text-[13px] text-[#6E7681] text-center mt-1">
            Enter your new password below.
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
            <Input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New password"
              className="pl-10 pr-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <Eye className="w-5 h-5 text-[#6E7681]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#6E7681]" />
              )}
            </span>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
            <Input
              type={showConfirm ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="pl-10 pr-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <Eye className="w-5 h-5 text-[#6E7681]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#6E7681]" />
              )}
            </span>
          </div>

          <Button
            type="submit"
            disabled={resetPass.isPending}
            className="w-full h-[44px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] cursor-pointer disabled:opacity-50 mt-2"
          >
            {resetPass.isPending ? <Spinner /> : "Reset password"}
          </Button>
        </form>

        <div className="text-center text-[13px] text-[#6E7681]">
          Remembered your password?{" "}
          <Link className="text-[#F0A500] hover:underline" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

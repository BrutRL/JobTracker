import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { reqResetPassMutate } from "@/tanstack/authTanstack";
import { useState } from "react";
export default function ReqResetPass() {
  const reqResetPass = reqResetPassMutate();
  const [email, setEmail] = useState("");

  const reqResetFn = (e) => {
    e.preventDefault();
    reqResetPass.mutate({ email });
  };
  return (
    <main className="bg-black w-full h-screen flex items-center justify-center relative">
      <div className="sm:max-w-[440px] w-full bg-[#161B22] border-[0.5px] border-white/10 p-6 md:p-8 gap-6 rounded-lg z-10">
        <div className="text-center mb-2" style={{ fontFamily: "Geist Mono" }}>
          <span className="text-[#F0A500]">JobQuest</span>
        </div>
        <h1 className="text-[26px] text-white text-center">
          Reset your password
        </h1>
        <p className="text-[13px] text-[#6E7681] text-center mt-1">
          Enter your email and we'll send you a reset link.
        </p>

        <form className="flex flex-col gap-4 mt-6" onSubmit={reqResetFn}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan.delacruz@gmail.com"
              className="pl-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[44px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117]"
          >
            {reqResetPass.isPending ? <Spinner /> : "Send reset link"}
          </Button>

          <Button
            type="button"
            className="w-full h-[44px] bg-transparent border-white/10 text-[#6E7681] hover:bg-[#21262D] hover:text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Button>
        </form>
      </div>

      {/* <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
        <div className="sm:max-w-[400px] w-full bg-[#161B22] border-[0.5px] border-white/10 p-8 gap-6 rounded-lg">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#3DDC84]/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#3DDC84]" />
            </div>
            <div>
              <h2 className="text-[22px] text-white mb-2">Check your email</h2>
              <p className="text-[13px] text-[#6E7681]">
                We've sent a password reset link to your email. Please check
                your inbox.
              </p>
            </div>
            <Button className="w-full h-[44px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] mt-2">
              OK
            </Button>
          </div>
        </div>
      </div> */}
    </main>
  );
}

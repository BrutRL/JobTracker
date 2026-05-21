import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export default function TooManyRequests() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-[400px]">
        <div className="w-16 h-16 rounded-full bg-[#F0A500]/10 flex items-center justify-center mb-6">
          <Clock className="w-8 h-8 text-[#F0A500]" />
        </div>

        <h1 className="text-white text-[24px] font-medium mb-2">
          Too Many Requests
        </h1>

        <p className="text-[#6E7681] text-[14px] mb-8 leading-relaxed">
          You've made too many requests in a short period. Please wait a moment
          and try again.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] py-3 rounded-lg text-[14px] transition-opacity"
          >
            Go back
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-transparent border border-white/10 text-[#6E7681] hover:text-white py-3 rounded-lg text-[14px] transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

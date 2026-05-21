import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main className="bg-[#161B22] h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center border-[0.5px] border-white/10 p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#E05C6B]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-[#E05C6B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-[28px] text-white mb-2">Error Occurred</h2>
            <p className="text-[15px] text-[#6E7681]">
              Something went wrong. Please try again.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full max-w-[300px] rounded-md cursor-pointer h-[48px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] mt-4"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center p-4 relative">
      <div className="text-center max-w-[480px]">
        <div className="mb-2">
          <span className="text-[#F0A500] text-[72px]">404</span>
        </div>

        <h1 className="text-[32px] text-white mb-3">Page not found</h1>

        <p className="text-[14px] text-[#6E7681] mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] h-[44px] px-8"
        >
          Go to home
        </Button>
      </div>
    </main>
  );
}

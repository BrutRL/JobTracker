import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center p-4 relative">
      <div className="text-center max-w-[480px]">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#F0A500]/10 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-[#F0A500]" />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-[#F0A500] text-[72px]">404</span>
        </div>

        <h1 className="text-[32px] text-white mb-3">Page not found</h1>

        <p className="text-[14px] text-[#6E7681] mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <Button className="bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] h-[44px] px-8">
          Go to home
        </Button>
      </div>
    </main>
  );
}

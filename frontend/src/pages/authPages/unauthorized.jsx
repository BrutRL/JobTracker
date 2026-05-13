import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div
      className="size-full flex items-center justify-center h-screen"
      style={{ backgroundColor: "#0D1117", fontFamily: "Geist, sans-serif" }}
    >
      {/* <div
        className="absolute top-8 left-8"
        style={{ fontFamily: "Geist Mono, monospace", color: "#F0A500" }}
      >
        Job Quest
      </div> */}
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "#161B22",
              border: "0.5px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <ShieldAlert className="w-8 h-8" style={{ color: "#E05C6B" }} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div
              className="text-[48px] font-medium"
              style={{ fontFamily: "Geist Mono, monospace", color: "#E05C6B" }}
            >
              403
            </div>
            <h1
              className="text-[24px] font-medium"
              style={{ color: "#F0F6FC" }}
            >
              Access denied
            </h1>
          </div>
          <p className="text-[14px]" style={{ color: "#8B949E" }}>
            You don't have permission to access this resource.
          </p>
        </div>

        <a
          href="/"
          className="w-full py-2.5 rounded-lg transition-all hover:brightness-110 block"
          style={{
            backgroundColor: "#F0A500",
            color: "#0D1117",
            fontWeight: 500,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Go to Login
        </a>

        <button
          onClick={() => history.back()}
          className="w-full py-2.5 rounded-lg transition-all hover:bg-white/5"
          style={{
            backgroundColor: "transparent",
            color: "#8B949E",
            border: "0.5px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
}

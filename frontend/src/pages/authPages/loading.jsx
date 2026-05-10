export default function Loading() {
  return (
    <div
      className="size-full flex items-center h-screen justify-center"
      style={{ backgroundColor: "#0D1117", fontFamily: "Geist, sans-serif" }}
    >
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div
            className="text-[32px] font-medium animate-pulse"
            style={{ fontFamily: "Geist Mono, monospace", color: "#F0A500" }}
          >
            JobQuest
          </div>

          <div className="flex justify-center">
            <div className="relative w-8 h-8">
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  border: "2px solid rgba(240, 165, 0, 0.2)",
                  borderTopColor: "#F0A500",
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-[13px]" style={{ color: "#8B949E" }}>
          Loading your opportunities...
        </div>
      </div>
    </div>
  );
}

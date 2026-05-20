import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BoardSkeleton() {
  const CARDS = [2, 3, 1, 2, 1];

  return (
    <div
      className="flex flex-1 overflow-hidden"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
          {CARDS.map((count, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              <div className="pl-3 border-l-2 border-white/10">
                <Skeleton
                  width={80}
                  height={14}
                  baseColor="#21262D"
                  highlightColor="#30363D"
                />
              </div>
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-3 flex flex-col gap-2"
                >
                  <div className="flex items-start gap-2">
                    <Skeleton
                      circle
                      width={32}
                      height={32}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <Skeleton
                        width={90}
                        height={12}
                        baseColor="#21262D"
                        highlightColor="#30363D"
                      />
                      <Skeleton
                        width={60}
                        height={10}
                        baseColor="#21262D"
                        highlightColor="#30363D"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Skeleton
                      width={40}
                      height={16}
                      borderRadius={999}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                    />
                    <Skeleton
                      width={55}
                      height={16}
                      borderRadius={999}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                    />
                  </div>
                  <Skeleton
                    width={35}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 bg-[#0D1117]">
      <Skeleton
        width={160}
        height={28}
        baseColor="#21262D"
        highlightColor="#30363D"
        className="mb-6"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4"
          >
            <Skeleton
              width={80}
              height={12}
              baseColor="#21262D"
              highlightColor="#30363D"
              className="mb-2"
            />
            <Skeleton
              width={60}
              height={32}
              baseColor="#21262D"
              highlightColor="#30363D"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <Skeleton
            width={160}
            height={16}
            baseColor="#21262D"
            highlightColor="#30363D"
            className="mb-4"
          />
          <div className="flex items-end gap-2 h-[180px] pt-4">
            <div className="flex flex-col justify-between h-full pb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  width={16}
                  height={10}
                  baseColor="#21262D"
                  highlightColor="#30363D"
                />
              ))}
            </div>

            <div className="flex-1 h-full flex flex-col justify-between">
              <Skeleton
                width="100%"
                height={140}
                baseColor="#21262D"
                highlightColor="#30363D"
                borderRadius={8}
              />
              <div className="flex justify-between mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    width={40}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <Skeleton
            width={130}
            height={16}
            baseColor="#21262D"
            highlightColor="#30363D"
            className="mb-4"
          />
          <div className="flex items-center gap-6">
            <Skeleton
              circle
              width={140}
              height={140}
              baseColor="#21262D"
              highlightColor="#30363D"
            />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton
                    width={8}
                    height={8}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                  <Skeleton
                    width={60}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                  <Skeleton
                    width={16}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <Skeleton
            width={120}
            height={16}
            baseColor="#21262D"
            highlightColor="#30363D"
            className="mb-4"
          />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-white/5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton
                    circle
                    width={32}
                    height={32}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                  <div>
                    <Skeleton
                      width={90}
                      height={12}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                      className="mb-1"
                    />
                    <Skeleton
                      width={120}
                      height={10}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                    />
                  </div>
                </div>
                <Skeleton
                  width={55}
                  height={20}
                  borderRadius={999}
                  baseColor="#21262D"
                  highlightColor="#30363D"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
            <Skeleton
              width={70}
              height={16}
              baseColor="#21262D"
              highlightColor="#30363D"
              className="mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                  key={i}
                  width={60 + i * 8}
                  height={24}
                  borderRadius={999}
                  baseColor="#21262D"
                  highlightColor="#30363D"
                />
              ))}
            </div>
          </div>

          <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
            <Skeleton
              width={140}
              height={16}
              baseColor="#21262D"
              highlightColor="#30363D"
              className="mb-3"
            />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton
                    width={55}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                  <div className="flex-1">
                    <Skeleton
                      width="100%"
                      height={8}
                      borderRadius={999}
                      baseColor="#21262D"
                      highlightColor="#30363D"
                    />
                  </div>
                  <Skeleton
                    width={16}
                    height={10}
                    baseColor="#21262D"
                    highlightColor="#30363D"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

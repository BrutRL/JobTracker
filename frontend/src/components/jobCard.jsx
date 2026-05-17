import { useDrag } from "react-dnd";

export function JobCard({ job, onClick, isToday }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "job",
    item: { id: job.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-3 cursor-pointer hover:bg-[#21262D] transition-colors"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-start gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] flex-shrink-0"
          style={{ backgroundColor: "#21262D", color: "#fff" }}
        >
          {job.company.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[14px] truncate">{job.company}</div>
          <div className="text-[13px] text-[#6E7681] truncate">{job.role}</div>
        </div>
        {isToday && (
          <div className="w-2 h-2 rounded-full bg-[#F0A500] animate-pulse flex-shrink-0" />
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {job.tags.map((tag, i) => (
          <span
            key={i}
            className="text-[11px] bg-[#21262D] text-[#6E7681] px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-[11px] text-[#6E7681] mt-2">
        {job.appliedDate &&
          new Date(job.appliedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        {isToday && <span className="ml-2 text-[#F0A500]">Today</span>}
      </div>
    </div>
  );
}

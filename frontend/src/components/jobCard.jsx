import { useDrag } from "react-dnd";
import { X, AlertCircle } from "lucide-react";
export function JobCard({ job, onClick, isToday }) {
  const [{ isDragging }, drag] = useDrag({
    type: "job",
    item: { id: job.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const needsFollowUp = () => {
    if (job.status !== "applied") return false;
    const appliedDate = new Date(job.appliedAt);
    const today = new Date();
    const diffDays = Math.floor((today - appliedDate) / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  };

  const followUp = needsFollowUp();

  return (
    <div
      ref={drag}
      onClick={onClick}
      className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:bg-[#21262D] transition-colors"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 bg-[#21262D] text-white">
          {job.company.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[14px] truncate">{job.company}</div>
          <div className="text-[13px] text-[#6E7681] truncate">{job.role}</div>
        </div>
        {isToday && (
          <div className="w-2 h-2 rounded-full bg-[#F0A500] animate-pulse flex-shrink-0 mt-1" />
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {(Array.isArray(job.tags) ? job.tags : []).map((tag, id) => (
          <span
            key={id}
            className="text-[11px] bg-[#21262D] text-[#6E7681] px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-[11px] text-[#6E7681] pl-1">
          {job.appliedDate &&
            new Date(job.appliedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          {isToday && <span className="ml-2 text-[#F0A500]">Today</span>}
        </div>

        {followUp && (
          <div
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#4A90D920", color: "#4A90D9" }}
            title="No response in 7+ days. Consider following up."
          >
            <AlertCircle className="w-3 h-3" />
            Follow up
          </div>
        )}
      </div>
    </div>
  );
}

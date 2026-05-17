import { useDrop } from "react-dnd";
import { JobCard } from "./jobCard";
export function KanbanColumn({
  title,
  status,
  jobs,
  count,
  color,
  onJobClick,
  onDrop,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "job",
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      ref={drop}
      className={`flex-shrink-0 w-full md:w-[280px] ${isOver ? "opacity-50" : ""}`}
    >
      <div className="border-l-2 pl-3 mb-3" style={{ borderColor: color }}>
        <div className="flex items-center gap-2">
          <span className="text-white text-[14px]">{title}</span>
          <span
            className="px-2 py-0.5 rounded-full text-[11px]"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onJobClick(job)}
            isToday={job.appliedDate === today}
          />
        ))}
      </div>
    </div>
  );
}

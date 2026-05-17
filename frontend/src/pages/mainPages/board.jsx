import { useOutletContext } from "react-router-dom";
import { allQuery } from "@/tanstack/applicationTanstack";
import { KanbanBoard } from "../../components/KanbanBoard";

function Board() {
  const { setJobs } = useOutletContext();

  const { data, isLoading } = allQuery();

  const jobs = (data?.data || []).map((job) => ({
    ...job,
    id: job._id,
    appliedDate: job.appliedAt?.split("T")[0],
    tags: job.tags?.flatMap((t) => t.split(",")).map((t) => t.trim()),
    timeline: [],
    contacts: [],
  }));

  const handleJobUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)),
    );
  };

  const handleJobMove = (jobId, newStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)),
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-[#6E7681]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <KanbanBoard
        jobs={jobs}
        onJobUpdate={handleJobUpdate}
        onJobMove={handleJobMove}
      />
    </div>
  );
}

export default Board;

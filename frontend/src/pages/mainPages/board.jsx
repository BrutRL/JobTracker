import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { allQuery, updateStatusMutate } from "@/tanstack/applicationTanstack";
import { KanbanBoard } from "../../components/KanbanBoard";
import BoardSkeleton from "@/components/boardSkeletonLoading";
function Board() {
  const { setJobs: setLayoutJobs } = useOutletContext();
  const updateStatus = updateStatusMutate();
  const { data, isLoading } = allQuery();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const mapped = data.data.map((job) => ({
        ...job,
        id: job._id,
        appliedDate: job.appliedAt?.split("T")[0],
        tags: job.tags?.flatMap((t) => t.split(",")).map((t) => t.trim()),
        timeline: [],
        contacts: [],
      }));
      setJobs(mapped);
      setLayoutJobs(mapped);
    }
  }, [data]);

  const handleJobUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)),
    );
    setLayoutJobs((prev) =>
      prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)),
    );
  };

  const handleJobMove = (jobId, newStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)),
    );
    setLayoutJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)),
    );
    updateStatus.mutate({ data: newStatus, id: jobId });
  };

  if (isLoading) return <BoardSkeleton />;

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

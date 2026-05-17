import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { KanbanColumn } from "./kanbanColumn";

const COLUMNS = [
  { title: "Wishlist", status: "wishlist", color: "#6E7681" },
  { title: "Applied", status: "applied", color: "#4A90D9" },
  { title: "Interview", status: "interview", color: "#F0A500" },
  { title: "Offer", status: "offer", color: "#3DDC84" },
  { title: "Rejected", status: "rejected", color: "#E05C6B" },
];

export function KanbanBoard({ jobs, onJobUpdate, onJobMove }) {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6 md:min-w-max">
            {COLUMNS.map((col) => {
              const columnJobs = jobs.filter((j) => j.status === col.status);
              return (
                <KanbanColumn
                  key={col.status}
                  title={col.title}
                  status={col.status}
                  jobs={columnJobs}
                  count={columnJobs.length}
                  color={col.color}
                  onJobClick={setSelectedJob}
                  onDrop={onJobMove}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

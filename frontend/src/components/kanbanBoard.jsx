import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  MultiBackend,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import { KanbanColumn } from "./kanbanColumn";
import { DetailPanel } from "./detailsPanel";

const COLUMNS = [
  { title: "Wishlist", status: "wishlist", color: "#6E7681" },
  { title: "Applied", status: "applied", color: "#4A90D9" },
  { title: "Interview", status: "interview", color: "#F0A500" },
  { title: "Offer", status: "offer", color: "#3DDC84" },
  { title: "Rejected", status: "rejected", color: "#E05C6B" },
];

const DND_OPTIONS = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        delayTouchStart: 200,
        ignoreContextMenu: true,
      },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

export function KanbanBoard({ jobs, onJobUpdate, onJobMove }) {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <DndProvider backend={MultiBackend} options={DND_OPTIONS}>
      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 h-full md:max-w-[1400px] md:mx-auto">
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

        {/* Detail panel - desktop */}
        {selectedJob && (
          <div className="hidden md:block w-[360px] border-l border-white/10">
            <DetailPanel
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onUpdateJob={(updatedJob) => {
                onJobUpdate(updatedJob);
                setSelectedJob(updatedJob);
              }}
            />
          </div>
        )}

        {/* Detail panel - mobile fullscreen */}
        {selectedJob && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#161B22]">
            <DetailPanel
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
}

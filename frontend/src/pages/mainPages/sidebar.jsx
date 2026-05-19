import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SidebarIcons } from "@/components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { AddJobModal } from "@/components/modal/addJobModal";
function Sidebar() {
  const [jobs, setJobs] = useState([]);
  const [addJobOpen, setAddJobOpen] = useState(false);

  const handleAddJob = (jobData) => {
    setJobs((prev) => [...prev, { ...jobData, id: `j${Date.now()}` }]);
    setAddJobOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0D1117] overflow-hidden">
      <Navbar onAddJob={() => setAddJobOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <SidebarIcons jobs={jobs} />
        </div>

        <main className="flex-1 overflow-hidden">
          <Outlet context={{ jobs, setJobs }} />
        </main>
      </div>

      <AddJobModal open={addJobOpen} onOpenChange={setAddJobOpen} />
    </div>
  );
}

export default Sidebar;

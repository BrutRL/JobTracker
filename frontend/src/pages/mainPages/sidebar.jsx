import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SidebarIcons } from "@/components/Sidebar";
import { Navbar } from "../../components/navBar";
import { AddJobModal } from "@/components/modal/addJobModal";

// function StreakBadge({ user }) {
//   const streak = user?.streak?.current || 0;
//   const longest = user?.streak?.longest || 0;

//   return (
//     <div
//       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
//       style={{ backgroundColor: streak > 0 ? "#F0A50015" : "#21262D" }}
//       title={`Longest streak: ${longest} days`}
//     >
//       <Flame
//         className="w-4 h-4"
//         style={{ color: streak > 0 ? "#F0A500" : "#6E7681" }}
//       />
//       <span
//         className="text-[13px] font-medium"
//         style={{
//           color: streak > 0 ? "#F0A500" : "#6E7681",
//           fontFamily: "Geist Mono",
//         }}
//       >
//         {streak}
//       </span>
//     </div>
//   );
// }
function Sidebar() {
  const [jobs, setJobs] = useState([]);
  const [addJobOpen, setAddJobOpen] = useState(false);

  const openAddJob = () => setAddJobOpen(true);

  return (
    <div className="h-screen flex flex-col bg-[#0D1117] overflow-hidden">
      <Navbar onAddJob={openAddJob} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <SidebarIcons jobs={jobs} />
        </div>

        <main className="flex-1 overflow-hidden">
          <Outlet context={{ jobs, setJobs, openAddJob }} />
        </main>
      </div>

      <AddJobModal open={addJobOpen} onOpenChange={setAddJobOpen} />
    </div>
  );
}

export default Sidebar;

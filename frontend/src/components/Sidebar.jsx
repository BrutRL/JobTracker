import { LayoutGrid, BarChart3, Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function SidebarIcons({ jobs }) {
  const navigate = useNavigate();
  const location = useLocation();

  const counts = {
    wishlist: jobs.filter((j) => j.status === "wishlist").length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interview: jobs.filter((j) => j.status === "interview").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  const statusColors = {
    wishlist: "#6E7681",
    applied: "#4A90D9",
    interview: "#F0A500",
    offer: "#3DDC84",
    rejected: "#E05C6B",
  };

  const navItems = [
    { icon: LayoutGrid, path: "/user/board", label: "Board" },
    { icon: BarChart3, path: "/user/dashboard", label: "Dashboard" },
    { icon: Bell, path: "/user/reminders", label: "Reminders" },
    { icon: Settings, path: "/user/profile", label: "Settings" },
  ];

  return (
    <div className="w-14 bg-[#0D1117] border-r border-white/10 flex flex-col items-center py-4 gap-6 flex-shrink-0">
      {navItems.map(({ icon: Icon, path, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`p-2 rounded-lg transition-colors ${
            location.pathname === path
              ? "bg-[#F0A500] text-[#0D1117]"
              : "text-[#6E7681] hover:text-white"
          }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}

      <div className="flex-1" />

      <div className="flex flex-col gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <div
            key={status}
            className="flex items-center justify-center w-10 h-6 rounded-full text-[10px]"
            style={{
              backgroundColor: `${statusColors[status]}20`,
              color: statusColors[status],
            }}
            title={`${status}: ${count}`}
          >
            {count}
          </div>
        ))}
      </div>
    </div>
  );
}

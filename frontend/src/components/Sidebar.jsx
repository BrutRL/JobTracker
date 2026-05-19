import { LayoutGrid, BarChart3, Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function SidebarIcons() {
  const navigate = useNavigate();
  const location = useLocation();

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
    </div>
  );
}

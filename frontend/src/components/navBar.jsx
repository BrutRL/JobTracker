import { useState } from "react";
import {
  Plus,
  Menu,
  X,
  LayoutGrid,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar({ onAddJob }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Board", path: "/user/board", icon: LayoutGrid },
    { label: "Dashboard", path: "/user/dashboard", icon: BarChart3 },
    { label: "Reminders", path: "/user/reminders", icon: Bell },
    { label: "Settings", path: "/user/profile", icon: Settings },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="h-14 bg-[#0D1117] border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[#6E7681] hover:text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-[#F0A500] font-mono text-[16px]">JobQuest</div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`text-[14px] transition-colors ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-[#6E7681] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onAddJob}
          className="bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] h-9 w-9 md:w-auto md:px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline text-[14px]">Add job</span>
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] bg-[#161B22] z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <span className="text-white font-medium text-[15px]">
            {navItems.find((i) => i.path === location.pathname)?.label ||
              "Menu"}
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[#6E7681] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 p-3">
          {navItems.map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={`flex items-center gap-3 p-3 rounded-lg text-[15px] transition-colors text-left ${
                location.pathname === path
                  ? "bg-[#F0A500]/10 text-white"
                  : "text-[#6E7681] hover:text-white hover:bg-[#21262D]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

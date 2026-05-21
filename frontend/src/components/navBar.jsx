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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/context/userInfoContext";
import { logoutMutate } from "@/tanstack/authTanstack";
export function Navbar({ onAddJob }) {
  const { user } = useAuth();
  const logout = logoutMutate();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

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

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <>
      <nav className="h-14 bg-[#0D1117] border-b border-white/10 flex items-center px-4 flex-shrink-0">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[#6E7681] hover:text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-[#F0A500] font-mono text-[16px]">JobQuest</div>
        </div>

        {/* Center: Desktop nav */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
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

        {/* Right: Add Job + Profile */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onAddJob}
            className="bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] h-9 w-9 md:w-auto md:px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline text-[14px]">Add job</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
              <img
                src={`${import.meta.env.VITE_BACK_END_URL}/avatar/${user?.avatar}`}
                alt="Profile image"
                className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center"
              />
              <span className="hidden md:inline text-white text-[14px]">
                {user?.name?.split(" ")[0]}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#161B22] border-white/10"
            >
              <div className="px-2 py-1.5">
                <p className="text-[13px] text-white">{user?.name}</p>
                <p className="text-[11px] text-[#6E7681]">{user?.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => handleNav("/user/profile")}
                className="group text-[13px] text-white hover:bg-[#21262D] hover:text-white cursor-pointer focus:bg-[#21262D] focus:text-white"
              >
                <Settings className="w-4 h-4 mr-2 text-[#6E7681] group-hover:text-white transition-colors" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-[13px] text-[#E05C6B] hover:bg-[#21262D] hover:text-[#E05C6B] cursor-pointer focus:bg-[#21262D] focus:text-[#E05C6B]"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
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

        {/* Mobile sidebar footer — user info + logout */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <div className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 rounded-full bg-[#F0A500] flex items-center justify-center text-[#0D1117] text-[12px] font-medium flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[14px] truncate">{user?.name}</p>
              <p className="text-[#6E7681] text-[12px] truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-[15px] text-[#E05C6B] hover:bg-[#21262D] transition-colors text-left"
          >
            Sign out
          </button>
        </div> */}
      </div>
    </>
  );
}

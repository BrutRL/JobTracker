import { useDrag } from "react-dnd";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const STATUS_OPTIONS = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
];

const STATUS_COLORS = {
  wishlist: "#6E7681",
  applied: "#4A90D9",
  interview: "#F0A500",
  offer: "#3DDC84",
  rejected: "#E05C6B",
};

export function JobCard({ job, onClick, isToday, onStatusChange }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const isMobile = window.innerWidth < 768;
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "job",
    item: { id: job.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowStatusMenu(false);
      }
    };
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusBtnClick = (e) => {
    e.stopPropagation();
    if (!showStatusMenu && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const menuHeight = 220;
      const spaceBelow = window.innerHeight - rect.bottom;
      const top =
        spaceBelow > menuHeight ? rect.bottom + 6 : rect.top - menuHeight - 6;
      setMenuPos({
        top,
        right: window.innerWidth - rect.right,
      });
    }
    setShowStatusMenu(!showStatusMenu);
  };

  const needsFollowUp = () => {
    if (job.status !== "applied") return false;
    const diffDays = Math.floor(
      (new Date() - new Date(job.appliedAt)) / (1000 * 60 * 60 * 24),
    );
    return diffDays >= 7;
  };

  return (
    <div
      ref={!isMobile ? drag : null}
      onClick={onClick}
      className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-3 cursor-pointer hover:bg-[#21262D] transition-colors relative"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 bg-[#21262D] text-white">
          {job.company.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[14px] truncate">{job.company}</div>
          <div className="text-[13px] text-[#6E7681] truncate">{job.role}</div>
        </div>
        {isToday && (
          <div className="w-2 h-2 rounded-full bg-[#F0A500] animate-pulse flex-shrink-0 mt-1" />
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {(Array.isArray(job.tags) ? job.tags : []).map((tag, id) => (
          <span
            key={id}
            className="text-[11px] bg-[#21262D] text-[#6E7681] px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-[11px] text-[#6E7681] pl-1">
          {job.appliedDate &&
            new Date(job.appliedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          {isToday && <span className="ml-2 text-[#F0A500]">Today</span>}
        </div>

        <div className="flex items-center gap-2">
          {needsFollowUp() && (
            <div
              className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#4A90D920", color: "#4A90D9" }}
            >
              <AlertCircle className="w-3 h-3" />
              Follow up
            </div>
          )}

          {isMobile && (
            <button
              ref={btnRef}
              onClick={handleStatusBtnClick}
              className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${STATUS_COLORS[job.status]}20`,
                color: STATUS_COLORS[job.status],
              }}
            >
              {job.status}
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* portal dropdown */}
      {showStatusMenu && (
        <div
          ref={menuRef}
          className="fixed z-[999] bg-[#161B22] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          style={{
            top: menuPos.top,
            right: menuPos.right,
            width: "180px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2.5 border-b border-white/10">
            <p className="text-[#6E7681] text-[11px] font-medium">Move to</p>
          </div>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(job.id, status);
                setShowStatusMenu(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-3 text-[13px] hover:bg-[#21262D] active:bg-[#21262D] transition-colors"
              style={{
                backgroundColor:
                  job.status === status ? "#21262D" : "transparent",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: STATUS_COLORS[status] }}
              />
              <span style={{ color: STATUS_COLORS[status] }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              {job.status === status && (
                <span className="ml-auto text-[#6E7681] text-[11px]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

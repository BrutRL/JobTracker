import { X } from "lucide-react";
import { useState } from "react";
import InterviewDetails from "./modal/interviewDetails";
const STATUS_COLORS = {
  wishlist: "#6E7681",
  applied: "#4A90D9",
  interview: "#F0A500",
  offer: "#3DDC84",
  rejected: "#E05C6B",
};

export function DetailPanel({ job, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = ["Overview", "Interview", "Contacts", "Notes"];

  return (
    <div className="w-full h-full bg-[#161B22] border-l border-white/10 flex flex-col">
      <div className="flex items-start justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#21262D] flex items-center justify-center text-white text-[13px]">
            {job.company.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-white text-[16px]">{job.company}</h2>
            <p className="text-[#6E7681] text-[13px]">{job.role}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-[#6E7681] hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-3 text-[13px] transition-colors border-b-2 ${
              activeTab === tab.toLowerCase()
                ? "border-[#F0A500] text-white"
                : "border-transparent text-[#6E7681] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "overview" && (
          <div className="flex flex-col gap-4">
            <div>
              <span
                className="px-3 py-1 rounded-full text-[12px]"
                style={{
                  backgroundColor: `${STATUS_COLORS[job.status]}20`,
                  color: STATUS_COLORS[job.status],
                }}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>

            {(job.salaryMin || job.salaryMax) && (
              <div>
                <p className="text-[#6E7681] text-[12px] mb-1">Salary Range</p>
                <p className="text-white text-[15px]">
                  ₱{job.salaryMin?.toLocaleString()} – ₱
                  {job.salaryMax?.toLocaleString()}/mo
                </p>
              </div>
            )}

            {job.location && (
              <div>
                <p className="text-[#6E7681] text-[12px] mb-1">Location</p>
                <p className="text-white text-[14px]">{job.location}</p>
              </div>
            )}

            {job.jobUrl && (
              <div>
                <p className="text-[#6E7681] text-[12px] mb-1">Job Posting</p>
                <a
                  href={job.jobUrl}
                  className="text-[#F0A500] text-[14px] mb-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  {job.jobUrl.replace("https://", "").replace("www.", "")}
                </a>
              </div>
            )}

            {/* Tags */}
            {job.tags?.length > 0 && (
              <div>
                <p className="text-[#6E7681] text-[12px] mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[12px] bg-[#21262D] text-[#6E7681] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "interview" && <InterviewDetails job={job} />}

        {activeTab === "contacts" && (
          <div className="text-[#6E7681] text-[13px]">Contacts coming soon</div>
        )}

        {activeTab === "notes" && (
          <div>
            <p className="text-[#6E7681] text-[12px] mb-2">Notes</p>
            <p className="text-white text-[13px]">
              {job.notes || "No notes yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

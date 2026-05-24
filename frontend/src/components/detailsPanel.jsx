import { X } from "lucide-react";
import { useState } from "react";
import InterviewDetails from "./interviewDetails";
import Contact from "./contact";
import { allQuery } from "@/tanstack/interviewTanstack";
import EditApplicationPanel from "./editApplication";
import JobAnalyzer from "./jobAnalyzer";
const STATUS_COLORS = {
  wishlist: "#6E7681",
  applied: "#4A90D9",
  interview: "#F0A500",
  offer: "#3DDC84",
  rejected: "#E05C6B",
};

export function DetailPanel({ job, onClose, onUpdateJob }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: interviewData } = allQuery(job?._id);
  const [isEditing, setIsEditing] = useState(false);
  const tabs = ["Overview", "Interview", "Contacts", "Notes", "Analyzer"];
  if (isEditing) {
    return (
      <EditApplicationPanel
        job={job}
        onClose={() => setIsEditing(false)}
        onUpdate={onUpdateJob}
      />
    );
  }
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
            className={`px-3 lg:px-2 py-3 text-[13px] transition-colors border-b-2 ${
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
            {job.status === "applied" &&
              Math.floor(
                (new Date() - new Date(job.appliedAt)) / (1000 * 60 * 60 * 24),
              ) >= 7 && (
                <div
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    backgroundColor: "#4A90D915",
                    border: "0.5px solid #4A90D930",
                  }}
                >
                  <AlertCircle className="w-4 h-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#4A90D9] text-[13px]">
                      Consider following up
                    </p>
                    <p className="text-[#6E7681] text-[11px] mt-0.5">
                      It's been{" "}
                      {Math.floor(
                        (new Date() - new Date(job.appliedAt)) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days since you applied. A polite follow-up email can
                      increase your chances.
                    </p>
                  </div>
                </div>
              )}
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
                  className="text-[#1E90FF] text-[14px] mb-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  {job.jobUrl.replace("https://", "").replace("www.", "")}
                </a>
              </div>
            )}

            {job.tags?.length > 0 && (
              <div>
                <p className="text-[#6E7681] text-[12px] mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[12px] bg-[#21262D] text-[#F0A500] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-white text-[12px]">Timeline</p>
              {interviewData?.data?.map((data, index) => (
                <div key={data._id || "applied"} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#F0A500] mt-3 flex-shrink-0" />
                    {index < interviewData?.data?.length - 1 && (
                      <div
                        className="w-[1px] bg-white/10 flex-1 my-1"
                        style={{ minHeight: "28px" }}
                      />
                    )}
                  </div>

                  <div className="flex items-start justify-between flex-1 pb-3 p-2 rounded-lg hover:bg-[#21262D] transition-colors group">
                    <div>
                      <p className="text-white text-[13px]">
                        {data.type === "applied"
                          ? "Applied"
                          : data.round || "Interview"}
                      </p>
                      <p className="text-[#6E7681] text-[11px]">
                        {new Date(
                          data.type === "applied"
                            ? data.date
                            : data.scheduledAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {data.notes && (
                        <p className="text-[#6E7681] text-[11px] mt-1">
                          "{data.notes}"
                        </p>
                      )}
                      {data.outcome && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{
                            backgroundColor:
                              data.outcome === "passed"
                                ? "#3DDC8420"
                                : data.outcome === "rejected"
                                  ? "#E05C6B20"
                                  : "#F0A50020",
                            color:
                              data.outcome === "passed"
                                ? "#3DDC84"
                                : data.outcome === "rejected"
                                  ? "#E05C6B"
                                  : "#F0A500",
                          }}
                        >
                          {data.outcome}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center cursor-pointer gap-2 bg-[#F0A500] text-[#0D1117] rounded-lg py-3 text-[14px] hover:opacity-90 transition-opacity mt-4"
            >
              Edit Application
            </button>
          </div>
        )}

        {activeTab === "interview" && <InterviewDetails job={job} />}

        {activeTab === "contacts" && <Contact application={job} />}

        {activeTab === "notes" && (
          <div>
            <p className="text-[#6E7681] text-[12px] mb-2">Notes</p>
            <p className="text-white text-[13px]">
              {job.notes || "No notes yet."}
            </p>
          </div>
        )}
        {activeTab === "analyzer" && <JobAnalyzer job={job} />}
      </div>
    </div>
  );
}

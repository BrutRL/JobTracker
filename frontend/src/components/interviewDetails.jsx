import { useState } from "react";
import { Plus, Trash2, PenLine } from "lucide-react";
import {
  allQuery,
  deleteMutate,
  createMutate,
  updateMutate,
} from "@/tanstack/interviewTanstack";
import InterviewDeleteModal from "./modal/interviewDeleteModal";
import InterviewUpdateModal from "./modal/interviewUpdateModal";
import { Spinner } from "./ui/spinner";
import InterviewPrep from "./interviewPrep";
export default function InterviewDetails({ job }) {
  const { data: interviewData } = allQuery(job?._id);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const create = createMutate();
  const update = updateMutate();
  const interviews = interviewData?.data || [];
  const [showLogModal, setShowLogModal] = useState(false);
  const destroy = deleteMutate();
  const [form, setForm] = useState({
    applicationId: job?._id,
    round: "",
    scheduledAt: "",
    format: "",
    notes: "",
    outcome: "",
  });

  const allInterview = [
    { type: "applied", date: job.appliedAt, label: "Applied" },
    ...interviews.map((i) => ({ type: "interview", ...i })),
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const createFn = (e) => {
    e.preventDefault();
    create.mutate(form, {
      onSuccess: () => {
        setForm({
          applicationId: job?._id,
          round: "",
          scheduledAt: "",
          format: "",
          notes: "",
          outcome: "",
        });
        setTimeout(() => {
          setShowLogModal(false);
        }, 500);
      },
    });
  };

  const updateFn = (e) => {
    e.preventDefault();
    update.mutate(
      { data: form, id: updateId },
      {
        onSuccess: () => {
          setForm({
            applicationId: job?._id,
            round: "",
            scheduledAt: "",
            format: "",
            notes: "",
            outcome: "",
          });
          setTimeout(() => {
            setShowUpdate(false);
          }, 500);
        },
      },
    );
  };
  const deleteFn = (id) => {
    destroy.mutate(id, {
      onSuccess: () => {
        setShowDelete(false);
      },
    });
  };

  return (
    <div className="flex flex-col p-4">
      {allInterview.map((data, index) => (
        <div key={data._id || "applied"} className="flex gap-3 ">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#F0A500] mt-3 flex-shrink-0" />
            {index < allInterview.length - 1 && (
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
                  data.type === "applied" ? data.date : data.scheduledAt,
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
            {data.type !== "applied" && (
              <div className="flex gap-3">
                <button
                  className="text-[#4A90D9] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setShowUpdate(true);
                    setUpdateId(data._id);
                    setForm(data);
                  }}
                >
                  <PenLine className="w-4 h-4" />
                </button>
                <button
                  className="text-[#E05C6B] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setShowDelete(true);
                    setDeleteId(data._id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowLogModal(true)}
        className="w-full flex items-center justify-center cursor-pointer gap-2 bg-[#F0A500] text-[#0D1117] rounded-lg py-3 text-[14px] hover:opacity-90 transition-opacity mt-4"
      >
        <Plus className="w-4 h-4" />
        Log Interview
      </button>
      <div className="mt-4 border-t border-white/10 pt-4">
        <InterviewPrep job={job} />
      </div>
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4"
            onSubmit={createFn}
          >
            <h3 className="text-white text-[16px]">Log Interview</h3>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Round name
              </label>
              <input
                value={form.round}
                name="round"
                required
                onChange={handleChange}
                placeholder="e.g., Technical Interview"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Date
              </label>
              <input
                type="date"
                name="scheduledAt"
                required
                onChange={handleChange}
                value={form.scheduledAt}
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Format
              </label>
              <select
                value={form.format}
                name="format"
                required
                onChange={handleChange}
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none"
              >
                <option value="phone">Phone Screen</option>
                <option value="behavioral">Behavioral</option>
                <option value="technical">Technical</option>
                <option value="final_round">Final Round</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Notes
              </label>
              <textarea
                value={form.notes}
                name="notes"
                required
                onChange={handleChange}
                placeholder="How did it go?"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none resize-none h-[80px] focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Outcome
              </label>
              <select
                value={form.outcome}
                name="outcome"
                required
                onChange={handleChange}
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none"
              >
                <option value="pending">Pending</option>
                <option value="passed">Passed</option>
                <option value="rejected">Rejected</option>
                <option value="no_show">No Show</option>
              </select>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowLogModal(false)}
                className=" flex-1 py-2 rounded-lg bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={create.isPending}
                className="flex flex-1 justify-center items-center bg-[#F0A500] text-[#0D1117] py-2 rounded-lg cursor-pointer text-[13px] transition-colors hover:bg-[#F0A500]/90 disabled:bg-[#F0A500]/50 disabled:text-[#0D1117]/50 
             disabled:cursor-not-allowed "
              >
                {create.isPending ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
      <InterviewDeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          deleteFn(deleteId);
        }}
        isPending={destroy.isPending}
      />
      <InterviewUpdateModal
        open={showUpdate}
        form={form}
        onChange={handleChange}
        onCancel={() => setShowUpdate(false)}
        onSubmit={updateFn}
        isPending={update.isPending}
      />
    </div>
  );
}

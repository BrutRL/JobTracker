import { useState, useCallback } from "react";
import { ArrowLeft, File } from "lucide-react";
import { deleteMutate, updateMutate } from "@/tanstack/applicationTanstack";
import { Spinner } from "./ui/spinner";
import ApplicationDeleteModal from "./modal/applicationDeleteModal";
import { useNavigate } from "react-router-dom";
const STATUSES = ["wishlist", "applied", "interview", "offer", "rejected"];

export default function EditApplicationPanel({ job, onClose, onUpdate }) {
  const update = updateMutate();
  const destroy = deleteMutate();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: job.company || "",
    role: job.role || "",
    status: job.status || "applied",
    location: job.location || "",
    salaryMin: job.salaryMin || "",
    salaryMax: job.salaryMax || "",
    jobUrl: job.jobUrl || "",
    tags: job.tags?.join(", ") || "",
    notes: job.notes || "",
    resumePath: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });
    update.mutate(
      { data, id: job._id },
      {
        onSuccess: () => {
          onUpdate({
            ...job,
            ...form,
            tags: form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          });
          onClose();
        },
      },
    );
  };

  const handleDelete = () => {
    destroy.mutate(job._id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        onClose();
        navigate("/user");
      },
    });
  };

  return (
    <div className="w-full h-full bg-[#161B22] flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <button onClick={onClose} className="text-[#6E7681] hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#21262D] flex items-center justify-center text-white text-[13px]">
            {job.company.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-[15px]">{job.company}</p>
            <p className="text-[#6E7681] text-[12px]">{job.role}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
      >
        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Company
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Salary Range
          </label>
          <div className="flex items-center gap-2">
            <input
              name="salaryMin"
              type="number"
              value={form.salaryMin}
              onChange={handleChange}
              placeholder="Min"
              className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
            />
            <span className="text-[#6E7681]">–</span>
            <input
              name="salaryMax"
              type="number"
              value={form.salaryMax}
              onChange={handleChange}
              placeholder="Max"
              className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
            />
          </div>
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Website
          </label>
          <input
            name="jobUrl"
            value={form.jobUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">Tags</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="React, TypeScript, Remote"
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any notes..."
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none resize-none h-[80px] focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Resume <span className="text-[#6E7681]/50">(optional)</span>
          </label>
          <div className="relative">
            <File className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
            <input
              type="file"
              name="resumePath"
              onChange={handleChange}
              accept=".pdf"
              className="w-full pl-10 pt-2 bg-[#21262D] border-none rounded-lg h-[44px] text-[#6E7681] file:text-[#6E7681] file:bg-[#21262D] file:border-none file:rounded-md file:px-1 file:py-1 file:cursor-pointer text-[13px] outline-none"
            />
          </div>
          {job.resumeUrl && (
            <p className="text-[#6E7681] text-[11px] mt-1">
              Current: {job.resumeUrl}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={update.isPending}
          className="w-full cursor-pointer bg-[#F0A500] flex justify-center items-center text-[#0D1117] py-3 rounded-lg text-[14px] hover:opacity-90 disabled:opacity-50"
        >
          {update.isPending ? <Spinner /> : "Save changes"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer text-white bg-[#21262D] lg:text-[#6E7681] py-3 rounded-lg text-[14px] hover:text-white transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="w-full cursor-pointer bg-transparent border border-[#E05C6B]/30 text-[#E05C6B] py-3 rounded-lg text-[14px] hover:bg-[#E05C6B]/10 transition-colors"
        >
          Delete application
        </button>
      </form>

      <ApplicationDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isPending={destroy.isPending}
      />
    </div>
  );
}

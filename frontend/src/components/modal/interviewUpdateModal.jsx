import { Spinner } from "../ui/spinner";

export default function InterviewUpdateModal({
  open,
  form,
  onChange,
  onCancel,
  onSubmit,
  isPending,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <form
        className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h3 className="text-white text-[16px]">Update Interview</h3>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">
            Round name
          </label>
          <input
            value={form.round}
            name="round"
            onChange={onChange}
            placeholder="e.g., Technical Interview"
            className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
          />
        </div>

        <div>
          <label className="text-[#6E7681] text-[12px] mb-1 block">Date</label>
          <input
            type="date"
            name="scheduledAt"
            onChange={onChange}
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
            onChange={onChange}
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
          <label className="text-[#6E7681] text-[12px] mb-1 block">Notes</label>
          <textarea
            value={form.notes}
            name="notes"
            onChange={onChange}
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
            onChange={onChange}
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
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg cursor-pointer bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex flex-1 justify-center items-center cursor-pointer  bg-[#F0A500] text-[#0D1117] py-2 rounded-lg text-[13px] hover:bg-[#F0A500]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Spinner /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

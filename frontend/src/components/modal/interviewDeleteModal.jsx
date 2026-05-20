import { Spinner } from "../ui/spinner";
export default function InterviewDeleteModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[500px] p-6">
        <h3 className="text-white text-[16px] font-medium mb-2">
          Are you sure?
        </h3>
        <p className="text-[#6E7681] text-[13px] mb-6">
          Are you sure you want to delete this timeline interview entry? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg cursor-pointer bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={onConfirm.isPending}
            className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white text-[13px] hover:bg-red-600/90 transition-colors disabled:bg-[#F0A500]/50 disabled:text-[#0D1117]/50 
             disabled:cursor-not-allowed"
          >
            {onConfirm.isPending ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

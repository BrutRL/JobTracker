import { useState } from "react";
import { Bell, Plus, Trash2, X, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  allQuery,
  createMutate,
  dismissMutate,
  deleteMutate,
} from "@/tanstack/reminderTanstack";
import { allQuery as applicationQuery } from "@/tanstack/applicationTanstack";
import { useAuth } from "@/context/userInfoContext";
import { remindersUpdateMutate } from "@/tanstack/userTanstack";
import { Spinner } from "@/components/ui/spinner";
import ReminderDeleteModal from "@/components/modal/reminderDeleteModal";
const TYPE_COLORS = {
  "follow-up": { bg: "#4A90D920", color: "#4A90D9" },
  interview: { bg: "#F0A50020", color: "#F0A500" },
};

export default function Reminder() {
  const { user } = useAuth();
  const { data: reminderData, isLoading } = allQuery();
  const { data: applicationData } = applicationQuery();
  const createReminder = createMutate();
  const dismissReminder = dismissMutate();
  const deleteReminder = deleteMutate();
  const updateUser = remindersUpdateMutate();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    applicationId: "",
    type: "follow-up",
    triggerAt: "",
  });

  const reminders = reminderData?.data || [];
  const applications = applicationData?.data || [];

  const upcoming = reminders.filter((r) => !r.sent);
  const past = reminders.filter((r) => r.sent);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createReminder.mutate(form, {
      onSuccess: (res) => {
        if (res.ok) {
          setShowModal(false);
          setForm({ applicationId: "", type: "follow-up", triggerAt: "" });
        }
      },
    });
  };
  const handleDelete = () => {
    deleteReminder.mutate(deleteId, {
      onSuccess: () => setShowDelete(false),
    });
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 bg-[#0D1117]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[26px] text-white">Reminders</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#F0A500] text-[#0D1117] px-4 py-2 rounded-lg text-[13px] hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add reminder
        </button>
      </div>

      {/* upcoming reminders */}
      <div className="mb-6">
        {isLoading ? (
          <div className="text-center py-12 text-[#6E7681] text-[13px]">
            Loading...
          </div>
        ) : upcoming.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#161B22] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#6E7681]" />
            </div>
            <p className="text-[#6E7681] text-[13px]">No upcoming reminders</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((reminder) => (
              <div
                key={reminder._id}
                className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4 flex items-start justify-between group"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#21262D] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#F0A500]" />
                  </div>
                  <div>
                    <p className="text-white text-[14px]">
                      {reminder.applicationId?.company}
                    </p>
                    <p className="text-[#6E7681] text-[12px]">
                      {reminder.applicationId?.role}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full capitalize"
                        style={{
                          backgroundColor:
                            TYPE_COLORS[reminder.type]?.bg || "#6E768120",
                          color: TYPE_COLORS[reminder.type]?.color || "#6E7681",
                        }}
                      >
                        {reminder.type}
                      </span>
                      <span className="text-[#6E7681] text-[11px]">
                        {new Date(reminder.triggerAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => dismissReminder.mutate(reminder._id)}
                    className="cursor-pointer text-[#6E7681] hover:text-white text-[11px] px-2 py-1 rounded bg-[#21262D]"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(reminder._id);
                      setShowDelete(true);
                    }}
                    className="cursor-pointer text-[#E05C6B] hover:opacity-80 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* past reminders */}
      {past.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[#6E7681] text-[13px] mb-3">Past</h2>
          <div className="flex flex-col gap-3">
            {past.map((reminder) => (
              <div
                key={reminder._id}
                className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4 flex items-start justify-between opacity-50 group"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#21262D] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#6E7681]" />
                  </div>
                  <div>
                    <p className="text-white text-[14px]">
                      {reminder.applicationId?.company}
                    </p>
                    <p className="text-[#6E7681] text-[12px]">
                      {reminder.applicationId?.role}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#6E768120] text-[#6E7681] capitalize">
                        {reminder.type}
                      </span>
                      <span className="text-[#6E7681] text-[11px]">
                        {new Date(reminder.triggerAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDeleteId(reminder._id);
                    setShowDelete(true);
                  }}
                  className="text-[#E05C6B] opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity  hover:text-red-500 "
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* email toggle */}
      <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-[16px]">Email reminders</div>
            <div className="text-[#6E7681] text-[13px] mt-1">{user?.email}</div>
          </div>
          <Switch
            checked={user?.emailReminders}
            onCheckedChange={(checked) =>
              updateUser.mutate({ emailReminders: checked })
            }
            className="data-[state=checked]:bg-[#F0A500]"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white text-[16px]">Add Reminder</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[#6E7681] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Application
              </label>
              <select
                name="applicationId"
                value={form.applicationId}
                onChange={handleChange}
                required
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500] truncate"
              >
                <option value="">Select application</option>
                {applications.map((app) => (
                  <option key={app._id} value={app._id}>
                    {`${app.company} — ${app.role}`.slice(0, 40)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              >
                <option value="follow-up">Follow-up</option>
                <option value="interview">Interview</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#6E7681] text-[12px] mb-1 block">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      triggerAt: `${e.target.value}T${prev.triggerAt.split("T")[1] || "00:00"}`,
                    }))
                  }
                  required
                  className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
                />
              </div>
              <div>
                <label className="text-[#6E7681] text-[12px] mb-1 block">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      triggerAt: `${prev.triggerAt.split("T")[0] || new Date().toISOString().split("T")[0]}T${e.target.value}`,
                    }))
                  }
                  required
                  className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 cursor-pointer py-2 rounded-lg bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createReminder.isPending}
                className="flex-1 flex justify-center items-center cursor-pointer bg-[#F0A500] text-[#0D1117] py-2 rounded-lg text-[13px] hover:opacity-90 disabled:opacity-50"
              >
                {createReminder.isPending ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <ReminderDeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

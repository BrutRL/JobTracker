import { useState } from "react";
import { Plus } from "lucide-react";

export default function Contact({ job }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    linkedin: "",
  });
  const contacts = job?.contacts || [];
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1">
        {contacts.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[#6E7681] text-[13px]">
            No contacts added yet
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {contacts.map((contact, i) => (
              <div
                key={i}
                className="bg-[#21262D] rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-white text-[13px]">{contact.name}</p>
                  <p className="text-[#6E7681] text-[11px]">{contact.role}</p>
                  <p className="text-[#6E7681] text-[11px]">{contact.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[#F0A500] text-[#0D1117] rounded-lg py-3 text-[14px] hover:opacity-90 transition-opacity mt-4"
      >
        <Plus className="w-4 h-4" />
        Add contact
      </button>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4">
            <h3 className="text-white text-[16px]">Add Contact</h3>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Maria Santos"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Role
              </label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g., HR Recruiter"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g., m.santos@company.com"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                LinkedIn <span className="text-[#6E7681]/50">(optional)</span>
              </label>
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/username"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-[#F0A500] text-[#0D1117] py-2 rounded-lg text-[13px] hover:opacity-90">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

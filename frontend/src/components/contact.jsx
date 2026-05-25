import { useState } from "react";
import { Plus, Trash2, PenLine } from "lucide-react";
import {
  allQuery,
  createMutate,
  updateMutate,
  deleteMutate,
} from "@/tanstack/contactTanstack";
import { Spinner } from "./ui/spinner";
export default function Contact({ application }) {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [contactId, setContactId] = useState(null);
  const { data: contactData } = allQuery(application?._id);
  const create = createMutate();
  const destroy = deleteMutate();
  const update = updateMutate();
  const [form, setForm] = useState({
    applicationId: application?._id,
    name: "",
    role: "",
    email: "",
    linkedIn: "",
  });
  const contacts = contactData?.data || [];
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createFn = (e) => {
    e.preventDefault();
    create.mutate(form, {
      onSuccess: () => {
        setForm({
          applicationId: application?._id,
          name: "",
          role: "",
          email: "",
          linkedin: "",
        });
        setShowModal(false);
      },
    });
  };

  const updateFn = (e) => {
    e.preventDefault();
    update.mutate(
      { data: form, id: contactId },
      {
        onSuccess: () => {
          setShowUpdate(false);
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
    <div className="flex flex-col h-full p-2">
      <div className="flex-1">
        {contacts.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[#6E7681] text-[13px]">
            No contacts added yet
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {contacts.map((contact) => (
              <div
                key={contact?._id}
                className=" hover:bg-[#21262D] rounded-lg p-3 flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex justify-between w-full">
                    <p className="text-white text-[13px]">{contact.name}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-[#4A90D9] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setShowUpdate(true);
                          setForm(contact);
                          setContactId(contact?._id);
                        }}
                      >
                        <PenLine className="w-4 h-4" />
                      </button>
                      <button
                        className="text-[#E05C6B] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setShowDelete(!showDelete);
                          setContactId(contact?._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#6E7681] text-[11px]">{contact.role}</p>
                  <p className="text-[#6E7681] text-[11px]">{contact.email}</p>
                </div>
                {contact.linkedIn && (
                  <p className="text-[#F0A500] text-[11px] cursor-pointer">
                    {contact.linkedIn}
                  </p>
                )}
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

      {/* create modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4"
            onSubmit={createFn}
          >
            <h3 className="text-white text-[16px]">Add Contact</h3>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Name
              </label>
              <input
                name="name"
                required
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
                required
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
                required
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
                name="linkedIn"
                value={form.linkedIn}
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
      {/* Delete Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[500px] p-6">
            <h3 className="text-white text-[16px] font-medium mb-2">
              Are you sure?
            </h3>
            <p className="text-[#6E7681] text-[13px] mb-6">
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 rounded-lg cursor-pointer bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteFn(contactId)}
                disabled={destroy.isPending}
                className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white text-[13px] hover:bg-red-600/90 transition-colors disabled:bg-[#F0A500]/50 disabled:text-[#0D1117]/50 
             disabled:cursor-not-allowed"
              >
                {destroy.isPending ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* update modal */}
      {showUpdate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            className="bg-[#161B22] border border-white/10 rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-4"
            onSubmit={updateFn}
          >
            <h3 className="text-white text-[16px]">Update Contact</h3>

            <div>
              <label className="text-[#6E7681] text-[12px] mb-1 block">
                Name
              </label>
              <input
                name="name"
                required
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
                required
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
                required
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
                name="linkedIn"
                value={form.linkedIn}
                onChange={handleChange}
                placeholder="linkedin.com/in/username"
                className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#F0A500]"
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowUpdate(false)}
                className="flex-1 py-2 rounded-lg bg-[#21262D] text-[#6E7681] text-[13px] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={update.isPending}
                className="flex flex-1 justify-center items-center bg-[#F0A500] text-[#0D1117] py-2 rounded-lg cursor-pointer text-[13px] transition-colors hover:bg-[#F0A500]/90 disabled:bg-[#F0A500]/50 disabled:text-[#0D1117]/50 
             disabled:cursor-not-allowed "
              >
                {update.isPending ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { createMutate } from "@/tanstack/applicationTanstack";
import { Spinner } from "../ui/spinner";
export function AddJobModal({ open, onOpenChange }) {
  const create = createMutate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    location: "",
    jobUrl: "",
    resumePath: "",
    salaryMin: "",
    salaryMax: "",
    tags: "",
    notes: "",
  });
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  });
  const createFn = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    create.mutate(data, {
      onSuccess: () => {
        setFormData({
          company: "",
          role: "",
          status: "applied",
          location: "Quezon City, PH",
          salaryMin: "",
          salaryMax: "",
          jobUrl: "",
          tags: "",
          notes: "",
        });
      },
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave({
  //     company: formData.company,
  //     role: formData.role,
  //     status: formData.status,
  //     location: formData.location,
  //     salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
  //     salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
  //     jobUrl: formData.jobUrl || undefined,
  //     tags: formData.tags
  //       .split(",")
  //       .map((t) => t.trim())
  //       .filter(Boolean),
  //     notes: formData.notes || undefined,
  //     appliedDate: new Date().toISOString().split("T")[0],
  //     timeline: [
  //       {
  //         id: `t${Date.now()}`,
  //         date: new Date().toISOString().split("T")[0],
  //         type: "Applied",
  //         title: "Applied",
  //       },
  //     ],
  //     contacts: [],
  //   });
  //   setFormData({
  //     company: "",
  //     role: "",
  //     status: "applied",
  //     location: "Quezon City, PH",
  //     salaryMin: "",
  //     salaryMax: "",
  //     jobUrl: "",
  //     tags: "",
  //     notes: "",
  //   });
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[520px] bg-[#161B22] border-[0.5px] border-white/10 max-h-[90vh] overflow-y-auto p-6  [&>button]:text-white
    [&>button]:opacity-100"
      >
        <DialogHeader>
          <DialogTitle className="text-white">Add Job Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={createFn} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Company
              </label>
              <Input
                value={formData.company}
                name="company"
                onChange={handleChange}
                placeholder="e.g., GCash"
                className="bg-[#21262D] border-none text-white"
                required
              />
            </div>
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Role
              </label>
              <Input
                value={formData.role}
                name="role"
                onChange={handleChange}
                placeholder="e.g., Frontend Developer"
                className="bg-[#21262D] border-none text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Status
              </label>
              <select
                value={formData.status}
                name="status"
                onChange={handleChange}
                className="w-full bg-[#21262D] border-none text-white rounded-md h-10 px-3"
              >
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Location
              </label>
              <Input
                value={formData.location}
                onChange={handleChange}
                name="location"
                placeholder="City, Country"
                className="bg-[#21262D] border-none text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Salary Min (₱)
              </label>
              <Input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="35000"
                className="bg-[#21262D] border-none text-white"
              />
            </div>
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Salary Max (₱)
              </label>
              <Input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="55000"
                className="bg-[#21262D] border-none text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[13px] text-[#6E7681] mb-2 block">
              Job URL
            </label>
            <Input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-[#21262D] border-none text-white"
            />
          </div>
          <div>
            <label className="text-[13px] text-[#6E7681] mb-2 block">
              Resume (PDF ONLY)
            </label>
            <Input
              type="file"
              name="resumePath"
              onChange={handleChange}
              accept=".pdf,application/pdf"
              className="bg-[#21262D]  border-none text-[#6E7681] file:text-[#6E7681] file:bg-[#21262D] file:border-none file:rounded-md  file:cursor-pointer"
              required
            />
          </div>

          <div>
            <label className="text-[13px] text-[#6E7681] mb-2 block">
              Tags (comma separated)
            </label>
            <Input
              value={formData.tags}
              name="tags"
              onChange={handleChange}
              placeholder="React, TypeScript, Remote"
              className="bg-[#21262D] border-none text-white"
            />
          </div>

          <div>
            <label className="text-[13px] text-[#6E7681] mb-2 block">
              Notes
            </label>
            <textarea
              value={formData.notes}
              name="notes"
              onChange={handleChange}
              placeholder="Any additional notes..."
              className="w-full h-[100px] bg-[#21262D] border-none rounded-lg p-3 text-white text-[13px] placeholder:text-[#6E7681] resize-none focus:outline-none focus:ring-1 focus:ring-[#F0A500]"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 cursor-pointer bg-transparent border-white/10 text-[#6E7681] hover:bg-[#21262D] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={create.isPending}
              className="flex-1 flex justify-center items-center cursor-pointer bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] disabled:cursor-not-allowed "
            >
              {create.isPending ? <Spinner /> : "Save application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

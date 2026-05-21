import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Reminder() {
  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <h1 className="text-[26px] text-white mb-6">Reminders</h1>

      <div className="space-y-4 mb-8">
        <div className="text-center py-12 text-[#6E7681] text-[13px]">
          No upcoming reminders
        </div>
      </div>

      <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-[16px]">Email reminders</div>
            <div className="text-[#6E7681] text-[13px] mt-1">
              user@example.com
            </div>
          </div>
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-[#F0A500]"
          />
        </div>
      </div>
    </div>
  );
}

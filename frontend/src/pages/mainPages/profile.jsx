import { useAuth } from "@/context/userInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Mail, MapPin, Lock } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="p-5 md:p-6 overflow-y-auto h-full">
      <h1 className="text-[26px] text-white mb-6">Profile Settings</h1>

      <div className="w-full md:max-w-[600px] space-y-6">
        {/* Profile Info */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F0A500] flex items-center justify-center text-[#0D1117] text-[20px]">
              {initials}
            </div>
            <div>
              <div className="text-white text-[18px]">{user?.name}</div>
              <div className="text-[#6E7681] text-[13px]">{user?.email}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Full name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                <Input
                  value={user?.name ?? ""}
                  readOnly
                  className="pl-10 bg-[#21262D] border-none h-[44px] text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] text-[#6E7681] mb-2 block">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                <Input
                  value={user?.email ?? ""}
                  readOnly
                  className="pl-10 bg-[#21262D] border-none h-[44px] text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password — placeholder only */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
          <h2 className="text-white text-[18px] mb-4">Change password</h2>
          <div className="space-y-4">
            {["Current password", "New password", "Confirm new password"].map(
              (label) => (
                <div key={label}>
                  <label className="text-[13px] text-[#6E7681] mb-2 block">
                    {label}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                    <Input
                      type="password"
                      readOnly
                      className="pl-10 bg-[#21262D] border-none h-[44px] text-white"
                    />
                  </div>
                </div>
              ),
            )}
            <Button
              disabled
              className="w-full h-[44px] bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update password
            </Button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
          <h2 className="text-white text-[18px] mb-2">Danger zone</h2>
          <p className="text-[#6E7681] text-[13px] mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="outline"
            className="w-full h-[44px] bg-transparent border-[#E05C6B] text-[#E05C6B] hover:bg-[#E05C6B]/10 hover:text-[#E05C6B]"
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

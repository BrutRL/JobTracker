import { useAuth } from "@/context/userInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Mail, Lock, File, Eye, EyeOff } from "lucide-react";
import { updateMutate, deleteMutate } from "@/tanstack/userTanstack";
import { useState, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
function Profile() {
  const { user } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    avatarPath: user?.avatar ?? "",
    password: "",
    confirm_password: "",
  });
  const update = updateMutate();
  const destroy = deleteMutate();

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  });

  const updateFn = (e) => {
    e.preventDefault();
    if (formData.password != formData.confirm_password) {
      return toast.error("Password dont match");
    }
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    update.mutate(data);
  };
  const deleteFn = () => {
    destroy.mutate();
  };

  return (
    <div className="flex flex-col items-center h-full overflow-y-auto w-screen bg-[#0D1117] py-10 px-4">
      <div className="w-full md:max-w-[600px] lg:max-w-[880px]">
        <h1 className="text-[26px] text-white mb-6">Profile Settings</h1>

        <form className="w-full space-y-6" onSubmit={updateFn}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left column — Profile Info */}
            <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`${import.meta.env.VITE_BACK_END_URL}/avatar/${user?.avatar}`}
                  alt="Profile image"
                  className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center"
                />
                <div>
                  <div className="text-white text-[18px]">{user?.name}</div>
                  <div className="text-[#6E7681] text-[13px]">
                    {user?.email}
                  </div>
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
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
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
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      className="pl-10 bg-[#21262D] border-none h-[44px] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] text-[#6E7681] mb-2 block">
                    Avatar
                  </label>
                  <div className="relative">
                    <File className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                    <Input
                      type="file"
                      name="avatarPath"
                      onChange={handleChange}
                      accept="image/*"
                      className="pl-10 pt-2 bg-[#21262D] border-none h-[44px]  text-[#6E7681] file:text-[#6E7681] file:bg-[#21262D] file:border-none file:rounded-md file:px-1 file:py-1 file:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Password + Danger zone */}
            <div className="space-y-6">
              <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
                <h2 className="text-white text-[18px] mb-4">Change password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[13px] text-[#6E7681] mb-2 block">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                      <Input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="pl-10 pr-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                      />
                      <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? (
                          <Eye className="w-5 h-5 text-[#6E7681]" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-[#6E7681] " />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] text-[#6E7681] mb-2 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
                      <Input
                        type={showConfirm ? "text" : "password"}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="pl-10 pr-10 bg-[#21262D] border-none h-[44px] text-white placeholder:text-[#6E7681]"
                      />
                      <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? (
                          <Eye className="w-5 h-5 text-[#6E7681]" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-[#6E7681] " />
                        )}
                      </span>
                    </div>
                  </div>
                  <Button
                    disabled={update.isPending}
                    type="submit"
                    className="w-full h-[44px] cursor-pointer bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0D1117] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {update.isPending ? <Spinner /> : "Update account"}
                  </Button>
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-6">
                <h2 className="text-white text-[18px] mb-2">Danger zone</h2>
                <p className="text-[#6E7681] text-[13px] mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button
                  variant="outline"
                  type="button"
                  disabled={destroy.isPending}
                  onClick={deleteFn}
                  className="w-full h-[44px] cursor-pointer bg-transparent border-[#E05C6B] text-[#E05C6B] hover:bg-[#E05C6B]/10 hover:text-[#E05C6B] disabled:cursor-not-allowed"
                >
                  {destroy.isPending ? <Spinner /> : "Delete account"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

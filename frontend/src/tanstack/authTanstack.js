import {
  login,
  register,
  request_reset_pass,
  reset_pass,
  logout,
} from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const loginMutate = () => {
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
};
export const registerMutate = () => {
  return useMutation({
    mutationFn: (data) => register(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
};

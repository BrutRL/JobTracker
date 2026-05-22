import {
  login,
  register,
  request_reset_pass,
  reset_pass,
  logout,
  authorized,
} from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const loginMutate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        navigate("/user");
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

export const reqResetPassMutate = () => {
  return useMutation({
    mutationFn: (email) => request_reset_pass(email),
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
export const resetPassMutate = () => {
  return useMutation({
    mutationFn: ({ data, id }) => reset_pass(data, id),
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
export const logoutMutate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
};
export const useAuthorized = () => {
  return useQuery({
    queryKey: ["authorize"],
    queryFn: () => authorized(),
    retry: 1,
  });
};

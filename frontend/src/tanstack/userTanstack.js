import { specific, update, destroy, updateEmailReminder } from "@/api/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const specificQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => specific(),
  });
};
export const updateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => update(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["user"]);
      } else {
        toast.error(response.error);
      }
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
};

export const remindersUpdateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateEmailReminder(data),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.invalidateQueries(["user"]);
      } else {
        toast.error(response.error);
      }
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
};
export const deleteMutate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => destroy(id),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["user"]);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

import { all, create, update, dismiss, destroy } from "@/api/reminder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const allQuery = () => {
  return useQuery({
    queryKey: ["reminder"],
    queryFn: () => all(),
  });
};
export const createMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["reminder"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const updateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }) => update(data, id),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.invalidateQueries(["reminder"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
export const dismissMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => dismiss(id),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.invalidateQueries(["reminder"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const deleteMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => destroy(id),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["reminder"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

import { all, create, update, updateStatus, destroy } from "@/api/application";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const allQuery = () => {
  return useQuery({
    queryKey: ["applications"],
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
        queryClient.invalidateQueries(["applications"]);
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
        toast.success(response.message);
        queryClient.invalidateQueries(["applications"]);
        queryClient.invalidateQueries(["user"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const updateStatusMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }) => updateStatus(data, id),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.invalidateQueries(["applications"]);
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
        queryClient.invalidateQueries(["applications"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

import { all, create, update, destroy } from "@/api/interview";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const allQuery = (id) => {
  return useQuery({
    queryKey: ["interviews", id],
    queryFn: () => all(id),
  });
};

export const createMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["interviews"]);
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
        queryClient.invalidateQueries(["interviews"]);
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
        queryClient.invalidateQueries(["interviews"]);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

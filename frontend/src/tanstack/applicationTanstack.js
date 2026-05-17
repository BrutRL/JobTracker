import { all, create } from "@/api/application";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
      toast.error(err);
    },
  });
};

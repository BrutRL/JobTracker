import { specific } from "@/api/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const specificQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => specific(),
  });
};

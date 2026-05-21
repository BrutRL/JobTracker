import { useQuery } from "@tanstack/react-query";
import { analytics } from "@/api/dashboard";

export const all = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => analytics(),
  });
};

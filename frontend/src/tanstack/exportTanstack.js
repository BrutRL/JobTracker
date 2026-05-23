import { useQuery } from "@tanstack/react-query";
import { exportPDF } from "@/api/export";

export const exportTanstack = () => {
  return useQuery({
    queryKey: ["export"],
    queryFn: () => exportPDF(),
    enabled: false,
  });
};

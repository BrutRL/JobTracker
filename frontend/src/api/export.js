const url = import.meta.env.VITE_BACK_END_URL;

export const exportPDF = async () => {
  const response = await fetch(`${url}/export/pdf`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to export PDF");

  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `jobquest-report.pdf`;
  link.click();
  URL.revokeObjectURL(link.href);
};

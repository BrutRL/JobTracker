const url = import.meta.env.VITE_BACK_END_URL;

export const generateInterviewPrep = async ({ company, role, tags }) => {
  const response = await fetch(`${url}/ai/interview_prep`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ company, role, tags }),
  });

  const data = await response.json();
  if (!data.ok) throw new Error(data.error);
  return data.data;
};

export const analyzeJobDescription = async ({ description, userTags }) => {
  const response = await fetch(`${url}/ai/analyze_job_description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ description, userTags }),
  });

  const data = await response.json();
  if (!data.ok) throw new Error(data.error);
  return data.data;
};

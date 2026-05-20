const url = import.meta.env.VITE_BACK_END_URL;
export const specific = async () => {
  const response = await fetch(`${url}/user/specific`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

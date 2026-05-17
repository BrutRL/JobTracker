const url = import.meta.env.VITE_BACK_END_URL;
export const all = async () => {
  const response = await fetch(`${url}/application/all`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

export const create = async (body) => {
  const response = await fetch(`${url}/application/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body,
  });
  return await response.json();
};

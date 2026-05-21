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
export const update = async (body) => {
  try {
    const response = await fetch(`${url}/user/update`, {
      method: "PUT",
      body: body,
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const destroy = async () => {
  try {
    const response = await fetch(`${url}/user/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

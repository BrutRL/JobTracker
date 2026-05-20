const url = import.meta.env.VITE_BACK_END_URL;
export const all = async (id) => {
  const response = await fetch(`${url}/interview/all/${id}`, {
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
  try {
    const response = await fetch(`${url}/interview/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const update = async (body, id) => {
  try {
    const response = await fetch(`${url}/interview/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id) => {
  try {
    const response = await fetch(`${url}/interview/delete/${id}`, {
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

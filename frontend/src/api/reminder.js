const url = import.meta.env.VITE_BACK_END_URL;
export const all = async () => {
  try {
    const response = await fetch(`${url}/reminder/all`, {
      method: "GET",
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
export const create = async (body) => {
  try {
    const response = await fetch(`${url}/reminder/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return await response.json(body);
  } catch (error) {
    throw error;
  }
};

export const update = async (body, id) => {
  try {
    const response = await fetch(`${url}/reminder/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return await response.json(body);
  } catch (error) {
    throw error;
  }
};

export const dismiss = async (id) => {
  try {
    const response = await fetch(`${url}/reminder/${id}/dismiss`, {
      method: "PATCH",
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

export const destroy = async (id) => {
  try {
    const response = await fetch(`${url}/reminder/delete/${id}`, {
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

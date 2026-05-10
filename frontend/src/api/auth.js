const url = import.meta.env.VITE_BACK_END_URL;

export const login = async (body) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
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

export const register = async (body) => {
  try {
    const response = await fetch(`${url}/auth/register`, {
      method: "POST",
      body: body,
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const request_reset_pass = async (body) => {
  try {
    const response = await fetch(`${url}/auth/request_reset_pass`, {
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

export const reset_pass = async (body, id) => {
  try {
    const response = await fetch(`${url}/auth/reset_pass/${id}`, {
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
export const logout = async () => {
  try {
    const response = await fetch(`${url}/auth/logout`, {
      method: "POST",
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

export const authorized = async () => {
  const response = await fetch(`${url}/auth/authorized`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

const API_BASE = "http://localhost:3000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const api = {
  get: async (url) => {
    const res = await fetch(API_BASE + url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.json();
  },

  post: async (url, data) => {
    const res = await fetch(API_BASE + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  put: async (url, data) => {
    const res = await fetch(API_BASE + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  delete: async (url) => {
    const res = await fetch(API_BASE + url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.json();
  },
};

export default api;
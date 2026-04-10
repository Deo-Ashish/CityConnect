import api from "./api";

const authService = {
  register: (data) =>
    api.post("/auth/register", data),

  login: (data) =>
    api.post("/auth/login", data),

  getMe: () =>
    api.get("/auth/me"),

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
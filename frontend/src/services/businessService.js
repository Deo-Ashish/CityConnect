import api from "./api";

const businessService = {
  getAll: () =>
    api.get("/business"),

  getById: (id) =>
    api.get(`/business/${id}`),

  getNearby: (lat, lng) =>
    api.get(
      `/business/search/nearby?lat=${lat}&lng=${lng}`
    ),

  getByCategory: (category) =>
    api.get(
      `/business/search?category=${category}`
    ),

  create: (data) =>
    api.post("/business", data),

  update: (id, data) =>
    api.put(`/business/${id}`, data),

  remove: (id) =>
    api.delete(`/business/${id}`),

  getMyBusinesses: () =>
    api.get("/business/my"),
};

export default businessService;
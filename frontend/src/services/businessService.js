import api from "./api";

const businessService = {
  getAll: () =>
    api.get("/business"),

  getById: (id) =>
    api.get(`/business/${id}`),

  getNearby: (lat, lng) =>
    api.get(
      `/search/nearby?lat=${lat}&lng=${lng}`
    ),

  getByCategory: (category) =>
    api.get(
      `/search?category=${category}`
    ),

  create: (data) =>
    api.post("/business", data),

  update: (id, data) =>
    api.put(`/business/${id}`, data),

  remove: (id) =>
    api.delete(`/business/${id}`),
};

export default businessService;
import api from "./api";

const reviewService = {
  getByBusiness: (businessId) =>
    api.get(`/review/${businessId}`),

  create: (data) =>
    api.post("/review", data),

  delete: (id) =>
    api.delete(`/review/${id}`),
};

export default reviewService;
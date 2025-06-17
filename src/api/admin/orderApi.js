import axios from "../api";

export const postOrderApi = (params) => axios.post("/orders", {params})
export const getAllOrderApi = (params) => axios.get("/orders", {params})
export const updateOrderApi = (id, params) => axios.put(`/orders/${id}`, {params})
export const deleteOrderApi = (id, params) => axios.delete(`/orders/${id}`, { params });

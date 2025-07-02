import axios from "../api";

export const postProductApi = (params) => axios.post("/admin/products", params, { headers: {
    "Content-Type": "multipart/form-data",
  },})
export const getAllProductApi = (params) => axios.get("/admin/products", {params})
export const updateProductApi = (id, params) => axios.put(`/admin/products/${id}`, params);
export const getProductApiById = (id) => axios.get(`/admin/products/${id}`);
export const deleteProductApi = (id, params) => axios.delete(`/admin/products/${id}`, {params})

import axios from "../api";

export const postProductApi = (params) => axios.post("/products", params)
export const getAllProductApi = (params) => axios.get("/products", {params})
export const updateProductApi = (id,params) => axios.put(`/products/${id}`, {params})
export const deleteProductApi = (id, params) => axios.delete(`/products/${id}`, {params})

import axios from "../api";

export const postBrandApi = (params) => axios.post("/brands", {params})
export const getAllBrandApi = (params) => axios.get("/brands", {params})
export const updateBrandApi = (id, params) => axios.put(`/brands/${id}`, {params})
export const  deleteBrandApi = (id, params) => axios.delete(`/brands/${id}`, {params})
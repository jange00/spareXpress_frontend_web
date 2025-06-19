import axios from "../api";

export const postSpecificationApi = (params) => axios.post("/specifications", {params})
export const getAllSpecificationApi = (params) => axios.get("/specifications", {params})
export const updateSpecificationApi = (id, params) => axios.put(`/specifications/${id}`, {params})
export const  deleteSpecificationApi = (id, params) => axios.delete(`/specifications/${id}`, {params})
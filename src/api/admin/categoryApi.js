import axios from "../api";

export const postCategoryApi = (params) => axios.post("/categories", params)
export const getAllCategoryApi = (params) => axios.get("/categories", {params})
export const updateCategoryApi = (id, params) => axios.put(`/categories/${id}`, {params})
export const deleteCategoryApi = (id, params) => axios.delete(`/categories/${id}`, {params})
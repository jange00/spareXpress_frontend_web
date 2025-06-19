import axios from "../api";

export const postSubCategoryApi = (params) => axios.post("/subcategories", {params})
export const getAllSubCategoryApi = (params) => axios.get("/subcategories", {params})
export const updateSubCategoryApi = (id, params) => axios.put(`/subcategories/${id}`, {params})
export const  deleteSubCategoryApi = (id, params) => axios.delete(`/subcategories/${id}`, {params})
import axios from "../api";

export const postCategoryApi = (params) => axios.post("/admin/categories", params)
export const getAllCategoryApi = (params) => axios.get("/admin/categories", {params})
// export const updateCategoryApi = (id, params) => axios.put(`/admin/categories/${id}`, {params})
export const updateCategoryApi = (id, params) => axios.put(`/admin/categories/${id}`, params);
// export const deleteCategoryApi = (id, params) => axios.delete(`/admin/categories/${id}`, {params})
export const deleteCategoryApi = (id, params) =>
    axios.delete(`/admin/categories/${id}`, { data: params });
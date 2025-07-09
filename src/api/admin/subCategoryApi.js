import axios from "../api";

export const postSubCategoryApi = (params) =>
    axios.post("/admin/subcategories", params, {
      headers: { 'Content-Type': 'application/json' },
    });
export const getAllSubCategoryApi = (params) => axios.get("/admin/subcategories", {params})
export const getSubCategoryByIdApi = (id,params) => axios.get(`/admin/subcategories/${id}`, params)
export const updateSubCategoryApi = (id, params) => axios.put(`/admin/subcategories/${id}`, params)
export const  deleteSubCategoryApi = (id, params) => axios.delete(`/admin/subcategories/${id}`, {params})
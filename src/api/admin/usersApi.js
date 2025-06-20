import axios from "../api";

export const postAdminUsersApi = (params) => axios.post("/auth/register", params,{headers: {
    "Content-Type": "multipart/form-data",
  },})
export const getAllAdminUsersApi = () => axios.get("/admin/users")
export const updateAdminUsersApi = (id, params) => axios.put(`/admin/users/${id}`, {params})
export const  deleteAdminUsersApi = (id, params) => axios.delete(`/admin/users/${id}`, {params})
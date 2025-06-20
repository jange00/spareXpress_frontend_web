import axios from "../api";

export const postAdminUsersApi = (params) => axios.post("/admin/users", {params})
export const getAllAdminUsersApi = () => axios.get("/admin/users")
export const updateAdminUsersApi = (id, params) => axios.put(`/admin/users/${id}`, {params})
export const  deleteAdminUsersApi = (id, params) => axios.delete(`/admin/users/${id}`, {params})
import axios from "../api";

// export const postBrandApi = (params) => axios.post("/admin/brands", params, {
//     headers: { 'Content-Type': 'application/json' },
//   })
  export const postBrandApi = (params) =>
    axios.post("/admin/brands", params, {
      headers: { 'Content-Type': 'application/json' },
    });
export const getAllBrandApi = () => axios.get("/admin/brands", )
export const updateBrandApi = (id, params) => axios.put(`/admin/brands/${id}`, params)
export const deleteBrandApi = (id, params) =>
    axios.delete(`/admin/brands/${id}`, { data: params });
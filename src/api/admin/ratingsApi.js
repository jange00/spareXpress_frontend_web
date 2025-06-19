import axios from "../api";

export const postRatingsApi = (params) => axios.post("/ratings", {params})
export const getAllRatingsApi = (params) => axios.get("/ratings", {params})
export const updateRatingsApi = (id, params) => axios.put(`/ratings/${id}`, {params})
export const  deleteRatingsApi = (id, params) => axios.delete(`/ratings/${id}`, {params})
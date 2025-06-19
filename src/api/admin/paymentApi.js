import axios from "../api";

export const postPaymentApi = (params) => axios.post("/payments", {params})
export const getAllPaymentApi = (params) => axios.get("/payments", {params})
export const updatePaymentApi = (id, params) => axios.put(`/payments/${id}`, {params})
export const  deletePaymentApi = (id, params) => axios.delete(`/payments/${id}`, {params})
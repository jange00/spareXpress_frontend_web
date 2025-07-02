import axios from "../api";

export const postShippingAddressApi = (params) => axios.post("/shipping-address", params)
export const getAllShippingAddressApi = () => axios.get("/shipping-address", )
export const updateShippingAddressApi = (id, params) => axios.put(`/shipping-address/${id}`, {params})
export const  deleteShippingAddressApi = (id, params) => axios.delete(`/shipping-address/${id}`, {params})

export const getShippingAddressByUserIdApi = (userId) =>
    axios.get(`/shipping-address/users/${userId}`);
export const getShippingAddressByUserApi = () =>
    axios.get(`/shipping-address/users/`);
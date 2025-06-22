import axios from "../api";

export const postOrderApi = (params) => axios.post("/orders", params)
export const getAllOrderApi = () => axios.get("/orders")
export const updateOrderApi = (id, params) => axios.put(`/orders/${id}`, {params})
export const deleteOrderApi = (id, params) => axios.delete(`/orders/${id}`, { params });

// export const getOrderByUserIdApi = (userId) =>
//     axios.get(`/orders/users/${userId}`);
export const getOrderByUserIdApi = (userId) => {
    console.log("Calling API for orders by userId:", userId);
    return axios.get(`/orders/users/${userId}`);
  };
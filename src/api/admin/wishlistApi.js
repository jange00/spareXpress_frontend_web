import axios from "../api";

export const postWishlistApi = (params) => axios.post("/wishlist", {params})
export const getAllWishlistApi = (params) => axios.get("/wishlist", {params})
export const updateWishlistApi = (id,params) => axios.put(`/wishlist/${id}`, {params})
export const  deleteWishlistApi = (id, params) => axios.delete(`/wishlist/${id}`, {params})


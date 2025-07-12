import axios from "../api";

// Add product to cart
export const postCartApi = (params) => {
    console.log(params);
    
    return axios.post("/cart", params)
};

// Get all cart items for a specific user
export const getCartByUserIdApi = () => axios.get(`/cart/user`);

// Remove a specific item from cart by cart item ID
export const deleteCartItemApi = (cartItemId) =>
  axios.delete(`/cart/item/${cartItemId}`);

// Clear entire cart for a user
export const clearCartByUserIdApi = (userId) =>
  axios.delete(`/cart/clear/${userId}`);

export const updateCartItemApi = (cartItemId, params) =>
    axios.put(`/cart/item/${cartItemId}`, params);

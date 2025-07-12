import {
    deleteCartItemApi,
    clearCartByUserIdApi,
  } from "../../../api/admin/cartApi";
  
  export const deleteCartItemService = async (cartItemId) => {
    try {
      const response = await deleteCartItemApi(cartItemId);
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Failed to delete cart item" };
    }
  };
  
  export const clearCartByUserIdService = async (userId) => {
    try {
      const response = await clearCartByUserIdApi(userId);
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Failed to clear cart" };
    }
  };
  
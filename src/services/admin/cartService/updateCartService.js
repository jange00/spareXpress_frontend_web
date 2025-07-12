import { updateCartItemApi } from "../../../api/admin/cartApi";

export const updateCartItemService = async (cartItemId, params) => {
  try {
    const response = await updateCartItemApi(cartItemId, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update cart item" };
  }
};

import { updateWishlistApi } from "../../../api/admin/wishlistApi";

export const updateWishlistService = async (id, params) => {
  try {
    const response = await updateWishlistApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Wishlist update failed" };
  }
};

import { deleteWishlistApi } from "../../../api/admin/wishlistApi";

export const deleteWishlistService = async (id, params) => {
  try {
    const response = await deleteWishlistApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Wishlist deletion failed" };
  }
};

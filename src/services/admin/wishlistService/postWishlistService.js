import { postWishlistApi } from "../../../api/admin/wishlistApi";

export const postWishlistService = async (params) => {
  try {
    const response = await postWishlistApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Wishlist creation failed" };
  }
};

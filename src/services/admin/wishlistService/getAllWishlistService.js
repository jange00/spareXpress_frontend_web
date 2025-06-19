import { getAllWishlistApi } from "../../../api/admin/wishlistApi";

export const getAllWishlistService = async (params) => {
  try {
    const response = await getAllWishlistApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching wishlist failed" };
  }
};

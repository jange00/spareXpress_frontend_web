import { getCartByUserIdApi } from "../../../api/admin/cartApi";

export const getCartByUserIdService = async () => {
    try {
      const response = await getCartByUserIdApi();
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Failed to fetch cart items" };
    }
  };
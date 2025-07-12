import { postCartApi } from "../../../api/admin/cartApi"; 

export const postCartService = async (params) => {
  try {
    const response = await postCartApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add to cart" };
  }
};

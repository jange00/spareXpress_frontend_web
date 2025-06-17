import { postOrderApi } from "../../../api/admin/orderApi"; 

export const postOrderService = async (params) => {
  try {
    const response = await postOrderApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Order creation failed" };
  }
};

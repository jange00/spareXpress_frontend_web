import { updateOrderApi } from "../../../api/admin/orderApi";

export const updateOrderService = async (id, params) => {
  try {
    const response = await updateOrderApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Order update failed" };
  }
};

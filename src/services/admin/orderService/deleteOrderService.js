import { deleteOrderApi } from "../../../api/admin/orderApi";

export const deleteOrderService = async (id, params) => {
  try {
    const response = await deleteOrderApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Order deletion failed" };
  }
};

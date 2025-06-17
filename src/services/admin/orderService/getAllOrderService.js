import { getAllOrderApi } from "../../../api/admin/orderApi";

export const getAllOrderService = async (params) => {
  try {
    const response = await getAllOrderApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching orders failed" };
  }
};

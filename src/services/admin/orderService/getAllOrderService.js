import { getAllOrderApi } from "../../../api/admin/orderApi";

export const getAllOrderService = async (params) => {
  try {
    const response = await getAllOrderApi();
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching orders failed" };
  }
};

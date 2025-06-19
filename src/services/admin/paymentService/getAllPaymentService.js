import { getAllPaymentApi } from "../../../api/admin/paymentApi";

export const getAllPaymentService = async (params) => {
  try {
    const response = await getAllPaymentApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching payments failed" };
  }
};

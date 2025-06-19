import { updatePaymentApi } from "../../../api/admin/paymentApi";

export const updatePaymentService = async (id, params) => {
  try {
    const response = await updatePaymentApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Payment update failed" };
  }
};

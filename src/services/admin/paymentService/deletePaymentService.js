import { deletePaymentApi } from "../../../api/admin/paymentApi";

export const deletePaymentService = async (id, params) => {
  try {
    const response = await deletePaymentApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Payment deletion failed" };
  }
};

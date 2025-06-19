import { postPaymentApi } from "../../../api/admin/paymentApi";

export const postPaymentService = async (params) => {
  try {
    const response = await postPaymentApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Payment creation failed" };
  }
};

import { postShippingAddressApi } from "../../../api/admin/shippingAddressApi";

export const postShippingAddressService = async (params) => {
  try {
    const response = await postShippingAddressApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Shipping address creation failed" };
  }
};

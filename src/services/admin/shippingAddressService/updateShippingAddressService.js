import { updateShippingAddressApi } from "../../../api/admin/shippingAddressApi";

export const updateShippingAddressService = async (id, params) => {
  try {
    const response = await updateShippingAddressApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Shipping address update failed" };
  }
};

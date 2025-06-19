import { deleteShippingAddressApi } from "../../../api/admin/shippingAddressApi";

export const deleteShippingAddressService = async (id, params) => {
  try {
    const response = await deleteShippingAddressApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Shipping address deletion failed" };
  }
};

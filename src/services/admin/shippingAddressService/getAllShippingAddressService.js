import { getAllShippingAddressApi } from "../../../api/admin/shippingAddressApi";

export const getAllShippingAddressService = async (params) => {
  try {
    const response = await getAllShippingAddressApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching shipping addresses failed" };
  }
};

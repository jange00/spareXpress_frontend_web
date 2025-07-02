import { getProductApiById } from "../../../api/admin/productApi";

export const getProductByIdService = async (id) => {
  try {
    const response = await getProductApiById(id);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Product fetch by ID failed" };
  }
};
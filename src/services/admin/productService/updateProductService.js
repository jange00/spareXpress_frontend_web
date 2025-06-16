import { updateProductApi } from "../../../api/admin/productApi";

export const updateProductService = async (id, params) => {
    try {
      const response = await updateProductApi(id, params);
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Product update failed" };
    }
  };
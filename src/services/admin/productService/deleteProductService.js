import { deleteProductApi } from "../../../api/admin/productApi"; 

export const deleteProductService = async (id, params) => {
  try {
    const response = await deleteProductApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product deletion failed" };
  }
};

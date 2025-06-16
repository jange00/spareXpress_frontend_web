import { postProductApi } from "../../../api/admin/productApi";

export const postProductService = async (params) => {
  try {
    const response = await postProductApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product creation failed" };
  }
};
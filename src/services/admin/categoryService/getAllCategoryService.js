import { getAllCategoryApi } from "../../../api/admin/categoryApi";

export const getAllCategoryService = async (params) => {
  try {
    const response = await getAllCategoryApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching categories failed" };
  }
};

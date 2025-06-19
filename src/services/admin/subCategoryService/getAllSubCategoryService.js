import { getAllSubCategoryApi } from "../../../api/admin/subCategoryApi";

export const getAllSubCategoryService = async (params) => {
  try {
    const response = await getAllSubCategoryApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching subcategories failed" };
  }
};

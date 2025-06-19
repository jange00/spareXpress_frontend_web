import { postSubCategoryApi } from "../../../api/admin/subCategoryApi";

export const postSubCategoryService = async (params) => {
  try {
    const response = await postSubCategoryApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Subcategory creation failed" };
  }
};

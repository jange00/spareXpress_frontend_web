import { updateSubCategoryApi } from "../../../api/admin/subCategoryApi";

export const updateSubCategoryService = async (id, params) => {
  try {
    const response = await updateSubCategoryApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Subcategory update failed" };
  }
};

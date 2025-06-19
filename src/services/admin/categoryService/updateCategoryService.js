import { updateCategoryApi } from "../../../api/admin/categoryApi";

export const updateCategoryService = async (id, params) => {
  try {
    const response = await updateCategoryApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Category update failed" };
  }
};

import { deleteSubCategoryApi } from "../../../api/admin/subCategoryApi"; 

export const deleteSubCategoryService = async (id, params) => {
  try {
    const response = await deleteSubCategoryApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Subcategory deletion failed" };
  }
};

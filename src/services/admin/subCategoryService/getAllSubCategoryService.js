import { getAllSubCategoryApi } from "../../../api/admin/subCategoryApi";

export const getAllSubCategoryService = async (params) => {
  try {
    const response = await getAllSubCategoryApi(params);
    // console.log(response.data.data)
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching subcategories failed" };
  }
};

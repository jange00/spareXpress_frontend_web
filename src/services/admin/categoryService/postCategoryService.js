import { postCategoryApi } from "../../../api/admin/categoryApi";

export const postCategoryService = async (params) => {
  try {
    const response = await postCategoryApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Category creation failed" };
  }
};

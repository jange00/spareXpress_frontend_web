import { deleteCategoryApi } from "../../../api/admin/categoryApi";

// export const deleteCategoryService = async (id, params) => {
//   try {
//     const response = await deleteCategoryApi(id, params);
//     return response.data;
//   } catch (err) {
//     throw err.response?.data || { message: "Category deletion failed" };
//   }
// };


export const deleteCategoryService = async (id) => {
  const response = await deleteCategoryApi(id);
  return response.data;
};
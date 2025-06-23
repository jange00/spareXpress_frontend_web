import { deleteBrandApi } from "../../../api/admin/brandApi";

// export const deleteBrandService = async (id, params) => {
//   try {
//     const response = await deleteBrandApi(id, params);
//     return response.data;
//   } catch (err) {
//     throw err.response?.data || { message: "Brand deletion failed" };
//   }
// };

export const deleteBrandService = async (id, params) => {
  try {
    const response = await deleteBrandApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Brand deletion failed" };
  }
};

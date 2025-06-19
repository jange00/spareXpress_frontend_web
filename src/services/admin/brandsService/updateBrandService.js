import { updateBrandApi } from "../../../api/admin/brandApi";

export const updateBrandService = async (id, params) => {
  try {
    const response = await updateBrandApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Brand update failed" };
  }
};

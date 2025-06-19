import { getAllBrandApi } from "../../../api/admin/brandApi";

export const getAllBrandService = async (params) => {
  try {
    const response = await getAllBrandApi(params);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching brands failed" };
  }
};

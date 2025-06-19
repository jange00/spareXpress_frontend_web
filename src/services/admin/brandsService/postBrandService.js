import { postBrandApi } from "../../../api/admin/brandApi";

export const postBrandService = async (params) => {
  try {
    const response = await postBrandApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Brand creation failed" };
  }
};

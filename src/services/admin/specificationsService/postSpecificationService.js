import { postSpecificationApi } from "../../../api/admin/specificationApi";

export const postSpecificationService = async (params) => {
  try {
    const response = await postSpecificationApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Specification creation failed" };
  }
};

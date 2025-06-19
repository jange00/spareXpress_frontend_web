import { getAllSpecificationApi } from "../../../api/admin/specificationApi";

export const getAllSpecificationService = async (params) => {
  try {
    const response = await getAllSpecificationApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching specifications failed" };
  }
};

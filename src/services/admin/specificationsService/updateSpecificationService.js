import { updateSpecificationApi } from "../../../api/admin/specificationApi";

export const updateSpecificationService = async (id, params) => {
  try {
    const response = await updateSpecificationApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Specification update failed" };
  }
};

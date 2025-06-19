import { deleteSpecificationApi } from "../../../api/admin/specificationApi";

export const deleteSpecificationService = async (id, params) => {
  try {
    const response = await deleteSpecificationApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Specification deletion failed" };
  }
};

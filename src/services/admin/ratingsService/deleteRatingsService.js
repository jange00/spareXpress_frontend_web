import { deleteRatingsApi } from "../../../api/admin/ratingsApi";

export const deleteRatingsService = async (id, params) => {
  try {
    const response = await deleteRatingsApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Ratings deletion failed" };
  }
};

import { updateRatingsApi } from "../../../api/admin/ratingsApi";

export const updateRatingsService = async (id, params) => {
  try {
    const response = await updateRatingsApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Ratings update failed" };
  }
};

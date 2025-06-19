import { postRatingsApi } from "../../../api/admin/ratingsApi";

export const postRatingsService = async (params) => {
  try {
    const response = await postRatingsApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Ratings creation failed" };
  }
};

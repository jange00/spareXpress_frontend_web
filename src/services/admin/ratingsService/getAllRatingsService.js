import { getAllRatingsApi } from "../../../api/admin/ratingsApi";

export const getAllRatingsService = async (params) => {
  try {
    const response = await getAllRatingsApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching ratings failed" };
  }
};

import { useQuery } from "@tanstack/react-query";
import { getAllRatingsService } from "../../../services/admin/ratingsService/getAllRatingsService";

export const useGetAllRatings = (params) => {
  return useQuery({
    queryKey: ["admin_ratings", params],
    queryFn: () => getAllRatingsService(params),
  });
};

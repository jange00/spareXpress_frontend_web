import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRatingsService } from "../../../services/admin/ratingsService/updateRatingsService";

export const useUpdateRatings = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateRatingsService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_ratings"]);
    },
    onError: (error) => {
      console.error("Ratings update error:", error);
    },
  });
};

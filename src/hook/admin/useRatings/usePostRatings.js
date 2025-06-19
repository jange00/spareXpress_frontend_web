import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRatingsService } from "../../../services/admin/ratingsService/postRatingsService";

export const usePostRatings = () => {
  const queryClient = useQueryClient();

  return useMutation(postRatingsService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_ratings"]);
    },
    onError: (error) => {
      console.error("Ratings creation error:", error);
    },
  });
};

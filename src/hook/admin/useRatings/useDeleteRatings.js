import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRatingsService } from "../../../services/admin/ratingsService/deleteRatingsService";

export const useDeleteRatings = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteRatingsService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_ratings"]);
    },
    onError: (error) => {
      console.error("Ratings deletion error:", error);
    },
  });
};

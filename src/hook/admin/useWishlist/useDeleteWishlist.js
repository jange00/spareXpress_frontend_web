import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlistService } from "../../../services/admin/wishlistService/deleteWishlistService";

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteWishlistService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_wishlist"]);
    },
    onError: (error) => {
      console.error("Wishlist deletion error:", error);
    },
  });
};

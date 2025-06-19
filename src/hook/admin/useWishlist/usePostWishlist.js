import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWishlistService } from "../../../services/admin/wishlistService/postWishlistService";

export const usePostWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(postWishlistService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_wishlist"]);
    },
    onError: (error) => {
      console.error("Wishlist creation error:", error);
    },
  });
};

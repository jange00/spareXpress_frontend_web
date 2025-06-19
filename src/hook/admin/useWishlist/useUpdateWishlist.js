import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWishlistService } from "../../../services/admin/wishlistService/updateWishlistService";

export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateWishlistService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_wishlist"]);
    },
    onError: (error) => {
      console.error("Wishlist update error:", error);
    },
  });
};

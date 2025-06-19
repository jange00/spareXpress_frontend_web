import { useQuery } from "@tanstack/react-query";
import { getAllWishlistService } from "../../../services/admin/wishlistService/getAllWishlistService";

export const useGetAllWishlist = (params) => {
  return useQuery({
    queryKey: ["admin_wishlist", params],
    queryFn: () => getAllWishlistService(params),
  });
};

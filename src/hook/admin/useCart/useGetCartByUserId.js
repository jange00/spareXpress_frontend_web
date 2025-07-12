import { useQuery } from "@tanstack/react-query";
import { getCartByUserIdService } from "../../../services/admin/cartService/getCartService"; 

export const useGetCartByUserId = () => {
  return useQuery({
    queryKey: ["usercart"],
    queryFn:getCartByUserIdService,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false, 
    // enabled: !!userId, // only fetch when userId is available
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartByUserIdService } from "../../../services/admin/cartService/deleteCartService";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCartByUserIdService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Clear cart error:", error);
    },
  });
};

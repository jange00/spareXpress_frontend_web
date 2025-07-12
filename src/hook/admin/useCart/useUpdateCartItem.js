import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemService } from "../../../services/admin/cartService/updateCartService";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, params }) =>
      updateCartItemService(cartItemId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Update cart item error:", error);
    },
  });
};

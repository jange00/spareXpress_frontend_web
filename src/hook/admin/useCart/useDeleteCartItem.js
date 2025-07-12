import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItemService } from "../../../services/admin/cartService/deleteCartService";

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItemService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Delete cart item error:", error);
    },
  });
};

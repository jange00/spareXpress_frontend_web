import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCartService } from "../../../services/admin/cartService/postCartService"; 

export const usePostCart = () => {
  return useMutation({
    mutationFn: (data) => postCartService(data),
    onSuccess: () => {
      // Optionally refetch cart or show toast
      console.log("Product added to cart");
    },
    onError: (error) => {
      console.error("Add to cart error:", error);
    },
  });
};

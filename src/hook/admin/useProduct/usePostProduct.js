import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductService } from "../../../services/admin/productService/postProductService";

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProductService, 
    onSuccess: () => {
      // ✅ Correct cache key format
      queryClient.invalidateQueries({ queryKey: ["admin_product"] });
    },
    onError: (error) => {
      console.error("Product creation error:", error);
    },
  });
};

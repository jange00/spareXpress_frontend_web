import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductService } from "../../../services/admin/productService/postProductService";

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(postProductService, {
    onSuccess: () => {
      // Invalidate product list cache to refetch updated list
      queryClient.invalidateQueries(["admin_product"]);
    },
    onError: (error) => {
      console.error("Product creation error:", error);
    },
  });
};

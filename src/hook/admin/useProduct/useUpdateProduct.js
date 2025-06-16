import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../../../services/admin/productService/updateProductService";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updatedProduct }) => updateProductService(id, updatedProduct),
    {
      onSuccess: () => {
        // Invalidate product list cache to refetch updated list
        queryClient.invalidateQueries(["admin_product"]);
      },
      onError: (error) => {
        console.error("Product update error:", error);
      },
    }
  );
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "../../../services/admin/productService/deleteProductService";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_product"] })
    }
  })
}

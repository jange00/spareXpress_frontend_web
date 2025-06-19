import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "../../../services/admin/productService/deleteProductService";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteProductService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_product"]);
    },
    onError: (error) => {
      console.error("Product deletion error:", error);
    },
  });
};

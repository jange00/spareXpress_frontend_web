import { useQuery } from "@tanstack/react-query";
import { getProductByIdService } from "../../../services/admin/productService/getProductbyId";

export const useGetProductById = (id, enabled = true) => {
  return useQuery({
    queryKey: ["admin_product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id && enabled,
    onError: (error) => {
      console.error("Error fetching product by ID:", error);
    },
  });
};
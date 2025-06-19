import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrandService } from "../../../services/admin/brandsService/deleteBrandService";

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteBrandService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_brand"]);
    },
    onError: (error) => {
      console.error("Brand deletion error:", error);
    },
  });
};

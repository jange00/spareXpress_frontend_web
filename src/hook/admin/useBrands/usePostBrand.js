import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBrandService } from "../../../services/admin/brandsService/postBrandService";

export const usePostBrand = () => {
  const queryClient = useQueryClient();

  return useMutation(postBrandService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_brand"]);
    },
    onError: (error) => {
      console.error("Brand creation error:", error);
    },
  });
};

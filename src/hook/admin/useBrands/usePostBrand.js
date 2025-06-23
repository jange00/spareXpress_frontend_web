import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBrandService } from "../../../services/admin/brandsService/postBrandService";
import { updateBrandService } from "../../../services/admin/brandsService/updateBrandService";

export const usePostBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postBrandService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_brand"] });
    },
    onError: (error) => {
      console.error("Failed to create brand", error);
    },
  });
};



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrandService } from "../../../services/admin/brandsService/updateBrandService";

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateBrandService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_brand"]);
    },
    onError: (error) => {
      console.error("Brand update error:", error);
    },
  });
};

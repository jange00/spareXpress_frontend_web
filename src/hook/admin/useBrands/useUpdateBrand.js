import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrandService } from "../../../services/admin/brandsService/updateBrandService";

export const useUpdateBrand = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateBrandService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_brand"] })
    },
    onError: (error) => {
      console.error("Brand update error:", error)
    },
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryService } from "../../../services/admin/categoryService/updateCategoryService";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation ({
    mutationFn: ({id, data}) => updateCategoryService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["admin_category"] })
    },
    onError: (error) => {
      console.error("Category update error", error)
    }
  })
};


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryService } from "../../../services/admin/categoryService/deleteCategoryService";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryService, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_category"] });
    },
    onError: (error) => {
      console.error("Delete category failed:", error);
    },
  });
};
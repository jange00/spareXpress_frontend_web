import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryService } from "../../../services/admin/categoryService/updateCategoryService";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updateCategory }) => updateCategoryService(id, updateCategory), 
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (error) => {
      console.error("Category update error:", error);
    },
  }
);
};

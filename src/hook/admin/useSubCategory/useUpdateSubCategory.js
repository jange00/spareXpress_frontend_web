import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubCategoryService } from "../../../services/admin/subCategoryService/updateSubCategoryService";

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateSubCategoryService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_subcategory"] });
    },
    onError: (error) => {
      console.error("Failed to update subcategory:", error);
    },
  });
};
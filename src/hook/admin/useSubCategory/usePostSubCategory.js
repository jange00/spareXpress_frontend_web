import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubCategoryService } from "../../../services/admin/subCategoryService/postSubCategoryService"; 

export const usePostSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSubCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_subcategory'] });
    },
    onError: (error) => {
      console.error("Subcategory post failed:", error);
    },
  });
};

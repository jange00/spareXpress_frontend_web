import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubCategoryService } from "../../../services/admin/subCategoryService/postSubCategoryService"; 

export const usePostSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(postSubCategoryService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_subcategory"]);
    },
    onError: (error) => {
      console.error("Subcategory creation error:", error);
    },
  });
};

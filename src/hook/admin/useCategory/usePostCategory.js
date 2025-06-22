import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategoryService } from "../../../services/admin/categoryService/postCategoryService";

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (error) => {
      console.error("Category creation error:", error);
    },
  });
};

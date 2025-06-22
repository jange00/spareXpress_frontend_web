import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubCategoryService } from "../../../services/admin/subCategoryService/deleteSubCategoryService";

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, params }) => deleteSubCategoryService(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_subcategory"]);
    },
    onError: (error) => {
      console.error("Subcategory deletion error:", error);
    },
  });
};
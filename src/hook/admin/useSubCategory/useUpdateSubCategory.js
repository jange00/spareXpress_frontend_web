import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubCategoryService } from "../../../services/admin/subCategoryService/updateSubCategoryService";

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateSubCategoryService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_subcategory"]);
    },
    onError: (error) => {
      console.error("Subcategory update error:", error);
    },
  });
};

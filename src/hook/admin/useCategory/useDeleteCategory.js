import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryService } from "../../../services/admin/deleteCategoryService";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, params }) => deleteCategoryService(id, params),
   {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (error) => {
      console.error("Category deletion error:", error);
    },
  }
);
};

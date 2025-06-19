import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSpecificationService } from "../../../services/admin/specificationsService/postSpecificationService";

export const usePostSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation(postSpecificationService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_specification"]);
    },
    onError: (error) => {
      console.error("Specification creation error:", error);
    },
  });
};

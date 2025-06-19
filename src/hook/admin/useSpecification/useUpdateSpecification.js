import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecificationService } from "../../../services/admin/specificationsService/updateSpecificationService";

export const useUpdateSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateSpecificationService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_specification"]);
    },
    onError: (error) => {
      console.error("Specification update error:", error);
    },
  });
};

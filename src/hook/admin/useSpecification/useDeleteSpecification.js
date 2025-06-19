import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecificationService } from "../../../services/admin/specificationsService/deleteSpecificationService";

export const useDeleteSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteSpecificationService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_specification"]);
    },
    onError: (error) => {
      console.error("Specification deletion error:", error);
    },
  });
};

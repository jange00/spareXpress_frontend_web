import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderService } from "../../../services/admin/orderService/deleteOrderService";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, params }) => deleteOrderService(id, params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["admin_order"]);
      },
      onError: (error) => {
        console.error("Order deletion error:", error);
      },
    }
  );
};

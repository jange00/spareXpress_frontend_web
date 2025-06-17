import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "../../../services/admin/orderService/updateOrderService";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updatedOrder }) => updateOrderService(id, updatedOrder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["admin_order"]);
      },
      onError: (error) => {
        console.error("Order update error:", error);
      },
    }
  );
};

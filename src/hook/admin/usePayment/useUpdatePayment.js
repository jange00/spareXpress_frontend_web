import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaymentService } from "../../../services/admin/paymentService/updatePaymentService";

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updatePaymentService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_payment"]);
    },
    onError: (error) => {
      console.error("Payment update error:", error);
    },
  });
};

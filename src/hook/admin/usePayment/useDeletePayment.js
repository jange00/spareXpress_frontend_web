import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePaymentService } from "../../../services/admin/paymentService/deletePaymentService";

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deletePaymentService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_payment"]);
    },
    onError: (error) => {
      console.error("Payment deletion error:", error);
    },
  });
};

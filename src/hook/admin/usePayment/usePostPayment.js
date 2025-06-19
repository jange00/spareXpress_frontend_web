import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPaymentService } from "../../../services/admin/paymentService/postPaymentService";

export const usePostPayment = () => {
  const queryClient = useQueryClient();

  return useMutation(postPaymentService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_payment"]);
    },
    onError: (error) => {
      console.error("Payment creation error:", error);
    },
  });
};

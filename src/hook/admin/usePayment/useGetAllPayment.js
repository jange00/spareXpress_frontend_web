import { useQuery } from "@tanstack/react-query";
import { getAllPaymentService } from "../../../services/admin/paymentService/getAllPaymentService";

export const useGetAllPayment = (params) => {
  return useQuery({
    queryKey: ["admin_payment", params],
    queryFn: () => getAllPaymentService(params),
  });
};

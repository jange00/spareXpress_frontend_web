import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShippingAddressService } from "../../../services/admin/shippingAddressService/postShippingAddressService";

export const usePostShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:postShippingAddressService,
      onSuccess: () => {
        queryClient.invalidateQueries(["admin_shipping_address"]);
      },
      onError: (error) => {
        console.error("Shipping address creation error:", error);
      },
    }
  );
};

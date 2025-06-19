import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShippingAddressService } from "../../../services/admin/shippingAddressService/updateShippingAddressService";

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateShippingAddressService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_shipping_address"]);
    },
    onError: (error) => {
      console.error("Shipping address update error:", error);
    },
  });
};

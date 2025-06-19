import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShippingAddressService } from "../../../services/admin/shippingAddressService/deleteShippingAddressService";

export const useDeleteShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => deleteShippingAddressService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_shipping_address"]);
    },
    onError: (error) => {
      console.error("Shipping address deletion error:", error);
    },
  });
};

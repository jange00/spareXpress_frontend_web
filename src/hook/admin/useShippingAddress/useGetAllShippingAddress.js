import { useQuery } from "@tanstack/react-query";
import { getAllShippingAddressService } from "../../../services/admin/shippingAddressService/getAllShippingAddressService";

export const useGetAllShippingAddress = (params) => {
  return useQuery({
    queryKey: ["admin_shipping_address", params],
    queryFn: () => getAllShippingAddressService(params),
  });
};

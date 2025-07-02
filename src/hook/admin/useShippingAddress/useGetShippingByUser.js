import { useQuery } from "@tanstack/react-query";
import { getShippingAddressByUserApi } from "../../../api/admin/shippingAddressApi";

export const useGetShippingByUser = () => {
  return useQuery({
    queryKey: ["shippingAddressesAll"],
    queryFn: () => getShippingAddressByUserApi().then(res => {
        console.log(res.data.data);
        return res.data.data;
    }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    onError: (error) => {
      console.error("Error fetching all shipping addresses:", error);
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { getAllBrandService } from "../../../services/admin/brandsService/getAllBrandService";

export const useGetAllBrand = (params) => {
  return useQuery({
    queryKey: ["admin_brand", params],
    queryFn: () => getAllBrandService(params),
  });
};

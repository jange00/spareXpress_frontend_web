import { useQuery } from "@tanstack/react-query";
import { getBrandByIdApi } from "../../../api/admin/brandApi"; 

export const useGetBrandById = (id, params = {}, options = {}) => {
  return useQuery({
    queryKey: ["admin_brand", id, params],
    queryFn: () => getBrandByIdApi(id, params).then(res => res.data),
    enabled: !!id, // only run if `id` exists
    ...options,
  });
};
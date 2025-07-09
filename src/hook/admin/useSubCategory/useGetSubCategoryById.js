// hooks/admin/useSubcategories/useGetSubCategoryById.js
import { useQuery } from "@tanstack/react-query";
import { getSubCategoryByIdApi } from "../../../api/admin/subCategoryApi";

export const useGetSubCategoryById = (id, params = {}, options = {}) => {
  return useQuery({
    queryKey: ["admin_subcategory", id, params],
    queryFn: () => getSubCategoryByIdApi(id, params).then(res => res.data),
    enabled: !!id, // only run if `id` is truthy
    ...options,
  });
};

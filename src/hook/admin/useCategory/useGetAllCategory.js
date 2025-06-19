import { useQuery } from "@tanstack/react-query";
import { getAllCategoryService } from "../../../services/admin/categoryService/getAllCategoryService";

export const useGetAllCategory = (params) => {
  return useQuery({
    queryKey: ["admin_category", params],
    queryFn: () => getAllCategoryService(params),
  });
};

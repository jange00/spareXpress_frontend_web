import { useQuery } from "@tanstack/react-query";
import { getAllSubCategoryService } from "../../../services/admin/subCategoryService/getAllSubCategoryService";

export const useGetAllSubCategory = (params) => {
  return useQuery({
    queryKey: ["admin_subcategory", params],
    queryFn: () => getAllSubCategoryService(params),
  });
};

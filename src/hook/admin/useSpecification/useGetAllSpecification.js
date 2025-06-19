import { useQuery } from "@tanstack/react-query";
import { getAllSpecificationService } from "../../../services/admin/specificationsService/getAllSpecificationService";

export const useGetAllSpecification = (params) => {
  return useQuery({
    queryKey: ["admin_specification", params],
    queryFn: () => getAllSpecificationService(params),
  });
};

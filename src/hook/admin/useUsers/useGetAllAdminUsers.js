import { useQuery } from "@tanstack/react-query";
import { getAllAdminUsersService } from "../../../services/admin/usersService/getAllAdminUsersService";

export const useGetAllAdminUsers = (params) => {
  return useQuery({
    queryKey: ["admin_users", params],
    queryFn: () => getAllAdminUsersService(params),
  });
};

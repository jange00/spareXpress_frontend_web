import { useQuery } from "@tanstack/react-query";
import { getAdminUserByIdApi } from "../../../api/admin/usersApi";

export const useGetAdminUserById = (id, enabled = true) => {
  return useQuery({
    queryKey: ["admin_user", id],
    queryFn: () => getAdminUserByIdApi(id),
    enabled: !!id && enabled,
    select: (res) => res.data,
  });
};
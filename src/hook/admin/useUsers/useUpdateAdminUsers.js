import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminUsersService } from "../../../services/admin/usersService/updateAdminUsersService";

export const useUpdateAdminUsers = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, params }) => updateAdminUsersService(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_users"]);
    },
    onError: (error) => {
      console.error("Admin user update error:", error);
    },
  });
};

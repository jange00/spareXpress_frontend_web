import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAdminUsersService } from "../../../services/admin/usersService/postAdminUsersService";

export const usePostAdminUsers = () => {
  const queryClient = useQueryClient();

  return useMutation(postAdminUsersService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_users"]);
    },
    onError: (error) => {
      console.error("Admin user creation error:", error);
    },
  });
};

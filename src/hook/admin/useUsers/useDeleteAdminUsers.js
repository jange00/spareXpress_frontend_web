import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminUsersService } from "../../../services/admin/usersService/deleteAdminUsersService";

// export const useDeleteAdminUsers = () => {
//   const queryClient = useQueryClient();

//   return useMutation(({
//      id, params }) => deleteAdminUsersService(id, params), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["admin_users"]);
//     },
//     onError: (error) => {
//       console.error("Admin user deletion error:", error);
//     },
//   });
// };


export const useDeleteAdminUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminUsersService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] })
    }
  })
};
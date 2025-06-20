import { deleteAdminUsersApi } from "../../../api/admin/usersApi";

export const deleteAdminUsersService = async (id, params) => {
  try {
    const response = await deleteAdminUsersApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Admin user deletion failed" };
  }
};

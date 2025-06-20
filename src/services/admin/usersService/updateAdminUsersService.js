import { updateAdminUsersApi } from "../../../api/admin/usersApi";

export const updateAdminUsersService = async (id, params) => {
  try {
    const response = await updateAdminUsersApi(id, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Admin user update failed" };
  }
};

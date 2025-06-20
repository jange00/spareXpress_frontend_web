import { postAdminUsersApi } from "../../../api/admin/usersApi";

export const postAdminUsersService = async (params) => {
  try {
    const response = await postAdminUsersApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Admin user creation failed" };
  }
};

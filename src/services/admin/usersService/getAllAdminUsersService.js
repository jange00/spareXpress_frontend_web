import { getAllAdminUsersApi } from "../../../api/admin/usersApi";

export const getAllAdminUsersService = async () => {
  try {
    const response = await getAllAdminUsersApi();
    // console.log(response.data.data)
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching admin users failed" };
  }
};

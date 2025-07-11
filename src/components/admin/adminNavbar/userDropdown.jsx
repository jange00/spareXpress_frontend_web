import { useGetAdminUserById } from "../../../hook/admin/useUsers/useGetAdminUserByid";
import { User } from "lucide-react";

export const UserDropdown = () => {
  const storedUserId = localStorage.getItem("userid"); // Same as ProfileOptions
  const {
    data: user,
    isLoading,
    isError,
  } = useGetAdminUserById(storedUserId, !!storedUserId);

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (isLoading) return null;
  if (isError || !user) return <div>Error loading user.</div>;

  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-yellow-100 transition pr-24 gap-4">
      {/* Profile Image or Initials */}
      {user?.profilePicture ? (
        <img
          src={`http://localhost:3000/${user.profilePicture}`}
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover border border-gray-300"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-yellow-500 text-black grid place-items-center text-sm font-semibold ">
          {getInitials(user?.fullname || "AD")}
        </div>
      )}

      {/* Full Name */}
      <span className="text-sm font-medium text-gray-800">{user?.fullname}</span>
    </div>
  );
};

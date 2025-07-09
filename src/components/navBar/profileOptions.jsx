// src/components/ProfileOptions.jsx
import { useState, useRef } from "react";
import {
  ChevronDown,
  Home,
  History,
  CreditCard,
  Lock,
  LogOut,
  User,
} from "lucide-react";
import { useGetAdminUserById } from "../../hook/admin/useUsers/useGetAdminUserByid"; 

const profileOptions = [
  { label: "Home", icon: Home },
  { label: "Order History", icon: History },
  { label: "Payment History", icon: CreditCard },
  { label: "Change Password", icon: Lock },
  { label: "Logout", icon: LogOut },
];

const ProfileOptions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const storedUserid = localStorage.getItem("userid");
  console.log(storedUserid)
  // const userId = storedUser?._id;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetAdminUserById(storedUserid, !!storedUserid);
  console.log(user)

  const handleOptionClick = (label) => {
    if (label === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } else {
      alert(`Clicked: ${label}`);
      setIsDropdownOpen(false);
    }
  };

  if (isLoading) return <div>Loading user...</div>;
  if (isError) return <div>Error loading profile.</div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {user?.profilePicture ? (
          <img
            // src={user.profilePicture}
            src={`http://localhost:3000/${user.profilePicture}` || "/placeholder.svg?height=150&width=150"}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <User className="w-6 h-6" />
        )}
        <span className="hidden md:inline font-medium">
          {user?.fullname || "Profile"}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl ring-1 ring-black/5 z-20 overflow-hidden">
            <div className="py-2">
              {profileOptions.map(({ label, icon: Icon }, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(label)}
                  className={`flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-100 transition-all duration-200 ${
                    label === "Logout"
                      ? "border-t border-gray-100 hover:bg-red-50 hover:text-red-600"
                      : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileOptions;

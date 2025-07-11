import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  BarChart3, Box, CreditCard, LayoutDashboard, 
  Package, Settings, ShoppingCart, Users, Truck, Boxes, ListTree, BadgeCheck, LogOut 
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Manage Products", icon: Package },
  { id: "orders", label: "Orders Management", icon: ShoppingCart },
  { id: "users", label: "Users Management", icon: Users },
  { id: "inventory", label: "Inventory & Stock", icon: Box },
  { id: "payments", label: "Payment & Transactions", icon: CreditCard },
  { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "add-category", label: "Add Category", icon: Boxes },
  { id: "add-subcategory", label: "Add Sub Category", icon: ListTree },
  { id: "add-brands", label: "Add Brand", icon: BadgeCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or remove specific items like localStorage.removeItem("role");
    navigate("/sign-in"); // Navigate to landing page
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-black/10 bg-white">
      {/* Sidebar Header */}
      {/* <div className="border-b border-black/10 bg-[#FFB800] p-3.5">
        <Link
          to="/"
          className="text-3xl font-extrabold text-[#212121] tracking-wider cursor-pointer hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
        >
          <h1>
            Spare<span className="text-red-600">X</span>press
          </h1>
        </Link>
      </div> */}

<div className="border-b border-black/10 bg-[#FFB800] p-3.5">
  <h1 className="text-3xl font-extrabold text-[#212121] tracking-wider select-none">
    Spare<span className="text-red-600">X</span>press
  </h1>
</div>

      {/* Sidebar Menu */}
      <nav className="space-y-2 mt-12 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/admin/${item.id}`}
            className={({ isActive }) =>
              `flex items-center block px-4 py-2 rounded-lg ${
                isActive ? "bg-[#FFB800] text-black" : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-black/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

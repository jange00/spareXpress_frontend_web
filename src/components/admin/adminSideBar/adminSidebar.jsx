import React from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  BarChart3, Box, CreditCard, LayoutDashboard, 
  Package, Settings, ShoppingCart, Users, Truck, Boxes, ListTree, BadgeCheck
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
  { id: "add-Subcategory", label: "Add Sub Category", icon: ListTree },
  { id: "add-brands", label: "Add Brand", icon: BadgeCheck },
  { id: "settings", label: "Settings", icon: Settings },
 
];

const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-black/10 bg-white">
      {/* Sidebar Header */}
      <div className="border-b border-black/10 bg-[#FFB800] p-3.5">
        <Link to="/"      className="text-3xl font-extrabold text-[#212121] tracking-wider cursor-pointer hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
        >
          {/* <ShoppingCart className="h-6 w-6 text-black" /> */}
          <h1>
          Spare<span className="text-red-600">X</span>press
          </h1>
        </Link>
      </div>

      {/* Sidebar Menu */}
      <nav className="space-y-2 mt-12">
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
    </aside>
  );
};

export default AdminSidebar;

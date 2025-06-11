import { Outlet } from "react-router";
import AdminSidebar from "../components/admin/adminSidebar/adminSidebar";
import AdminNavbar from "../components/admin/adminNavbar/adminNavbar";


// Admin Layout
const AdminLayout = () => {
    return (
      <div className="flex h-screen">
        <AdminSidebar /> {/* Sidebar on the left */}
        <div className="flex flex-col flex-1">
          <AdminNavbar /> {/* Navbar right beside sidebar */}
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet /> {/* Renders nested routes like AdminDashboard */}
          </div>
        </div>
      </div>
    );
  };

  export default AdminLayout;
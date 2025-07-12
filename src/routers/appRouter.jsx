import AppLayout from "../layouts/appLayout";
import NotFound from "../components/Notfound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProductsListingPage from "../pages/ProductListingPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CheckoutPage from "../components/checkout/checkout";
import SignInPage from "../pages/signInPage";
import SignUpPage from "../pages/signUpPage";
import BestSellingProducts from "../components/LandingPageComponents/bestSelling/BestSellingProducts.js";
import DiscountOffers from "../components/LandingPageComponents/offerDiscountSection/DiscountOffers.jsx";
import AdminLayout from "../layouts/adminLayout.jsx";
import ProductManagement from "../pages/admin/productManagementPage.jsx";
import AdminDashboard from "../pages/admin/adminDashboardPage.jsx";
import UserManagement from "../pages/admin/userManagementPage.jsx";
import InventoryManagement from "../pages/admin/inventoryManagementPage.jsx";
import PaymentManagement from "../pages/admin/paymentManagementPage.jsx";
import ReportingDashboard from "../pages/admin/reportingAndAnalyticsPage.jsx";
import DeliveryManagement from "../pages/admin/deliveryMangementPage.jsx";
import SettingsPage from "../pages/admin/adminSettingPage.jsx";
import { OrderManagement } from "../pages/admin/orderManagementPage.jsx";
import AddCategoriesPage from "../pages/admin/addCategoryPage.jsx";
import { AddSubcategoryManagement } from "../pages/admin/addSubcategoryPage.jsx";
import { AddBrandManagement } from "../pages/admin/addBrandPage.jsx";
import ProtectedRoute from "./adminGuard.jsx";
// import ForgotPasswordPage from "../components/authComponents/forgetPassword/ResetPasswordPage.jsx";
import RequestResetPasswordPage from "../components/authComponents/forgetPassword/RequestResetPasswordPage.jsx";
import ResetPasswordPage from "../components/authComponents/forgetPassword/ResetPasswordPage.jsx";





export const router = createBrowserRouter([
  {
    element:
      <AppLayout />
,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <ProtectedRoute requiredRole="Customer"><LandingPage /></ProtectedRoute> },
      // { path: "/", element:<LandingPage/>},
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/request-reset-password", element: <RequestResetPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/products", element: <ProductsListingPage/>},
      { path: "/categories/:category", element: <ProductsListingPage /> },
      { path: "/vehicle/:subcategory", element: <ProductsListingPage /> },
      { path: "/computer/:subcategory", element: <ProductsListingPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
      { path: "/best-sellers", element: <BestSellingProducts/> },
      { path: "/deals", element: <DiscountOffers/> },
      { path: "/checkout", element: <ProtectedRoute requiredRole="Customer"><CheckoutPage /></ProtectedRoute> },
      { path: "/checkout", element: <CheckoutPage/> },
    ],
  },

  {
    element: <ProtectedRoute requiredRole="Admin">
      <AdminLayout />
    </ProtectedRoute>, 
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> }, 
      { path: "/admin/products", element: <ProductManagement/> },
      { path: "/admin/orders", element: <OrderManagement/>},
      { path: "/admin/users", element: <UserManagement/> },
      { path: "/admin/inventory", element: <InventoryManagement/> },
      { path: "/admin/payments", element: <PaymentManagement/> },
      { path: "/admin/reports", element: <ReportingDashboard/> },
      { path: "/admin/delivery", element: <DeliveryManagement/> },
      { path: "/admin/add-category", element: <AddCategoriesPage/> },
      { path: "/admin/add-subcategory", element: <AddSubcategoryManagement/> },
      { path: "/admin/add-brands", element: <AddBrandManagement/> },
      { path: "/admin/settings", element: <SettingsPage/> },
      
    ],
  },
]);

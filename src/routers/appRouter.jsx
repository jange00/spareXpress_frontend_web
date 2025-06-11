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
import AdminDashboard from "../pages/admin/adminDashboard.jsx";
import AdminLayout from "../layouts/adminLayout.jsx";
import ProductManagement from "../components/admin/ProductManagement/productManagement.jsx";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/products", element: <ProductsListingPage/>},
      { path: "/categories/:category", element: <ProductsListingPage /> },
      { path: "/vehicle/:subcategory", element: <ProductsListingPage /> },
      { path: "/computer/:subcategory", element: <ProductsListingPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
      { path: "/best-sellers", element: <BestSellingProducts/> },
      { path: "/deals", element: <DiscountOffers/> },
      { path: "/checkout", element: <CheckoutPage/> },
    ],
  },

  {
    element: <AdminLayout />, // Admin layout for admin dashboard routes
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> }, 
      { path: "/admin/products", element: <ProductManagement/> },
      // { path: "/admin/orders", element: <OrderManagement/> },
      // { path: "/admin/users", element: <UserManagement/> },
      // { path: "/admin/inventory", element: <InventoryManagement/> },
      // { path: "/admin/payments", element: <PaymentManagement/> },
      // { path: "/admin/reports", element: <ReportingDashboard/> },
      // { path: "/admin/delivery", element: <DeliveryManagement/> },
      // { path: "/admin/settings", element: <SettingsPage/> },
      
    ],
  },
]);

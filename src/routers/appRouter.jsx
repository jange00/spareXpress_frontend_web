import AppLayout from "../layouts/appLayout";
import NotFound from "../components/Notfound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProductsListingPage from "../pages/ProductListingPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CheckoutPage from "../components/checkout/checkout";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <LandingPage /> },
      // { path: "/sign-in", element: <SignInPage /> },
      // { path: "/sign-up", element: <SignUpPage /> },
      { path: "/products", element: <ProductsListingPage/>},
      { path: "/categories/:category", element: <ProductsListingPage /> },
      { path: "/vehicle/:subcategory", element: <ProductsListingPage /> },
      { path: "/computer/:subcategory", element: <ProductsListingPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
      // { path: "/best-sellers", element: <BestSellingProducts/> },
      // { path: "/deals", element: <DiscountOffers/> },
      { path: "/checkout", element: <CheckoutPage/> },
    ],
  },
]);

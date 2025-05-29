import AppLayout from "../layouts/appLayout";
import NotFound from "../components/Notfound/NotFound"
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <LandingPage /> },
        
    
       
      ],
    },
  ]);
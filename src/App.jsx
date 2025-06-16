import { RouterProvider } from 'react-router-dom';
import {ToastContainer,Slide, Zoom, Bounce, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './routers/appRouter';
import ReactQueryProvider from './provider/reactQueryProvider';

const App = () => (
  <ReactQueryProvider>
    <ToastContainer 
    position="top-right" 
    autoClose={3000} 
    hideProgressBar={false}
    theme='dark'
    transition={Flip}
    />
    <RouterProvider router={router} />
  </ReactQueryProvider>
);

export default App;
import { RouterProvider } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { router } from './routers/appRouter';
import ReactQueryProvider from './provider/reactQueryProvider';

const App = () => (
  <ReactQueryProvider>
    {/* <ToastContainer position="top-center" autoClose={3000} /> */}
    <RouterProvider router={router} />
  </ReactQueryProvider>
);

export default App;
import { Outlet } from 'react-router-dom';
import TopNavigationBar from '../components/navBar/TopNavigationBar';
import Footer from '../components/footer/Footer';


const AppLayout = () => (
  <>
    <div className="fixed top-0 left-0 w-full z-50">
      <TopNavigationBar />
    </div>
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AppLayout;
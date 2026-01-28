import Navbar from './Navbar';

const Layout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthService from '../services/auth.service';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
  }, [location]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    } finally {
      AuthService.logout();
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  const isActive = (path) => { return location.pathname === path; };
  
  const linkStyles = (path) => {
    const base = 'px-4 py-2 rounded-lg font-medium transition-all duration-200';
    return isActive(path)
      ? `${base} bg-primary-600 text-white`
      : `${base} text-slate-300 hover:bg-slate-700 hover:text-white`;
  };
  
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⃤</span>
            </div>
            <span className="text-xl font-bold text-slate-100">
              Red Social
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link to="/" className={linkStyles('/')}>
              Panel
            </Link>
            <Link to="/create" className={linkStyles('/create')}>
              Publicar
            </Link>
            
            {isAuthenticated && (
              <Button onClick={handleLogout} variant="ghost" size="sm" className="ml-2">
                Cerrar Sesión
              </Button>
            )}
            
            {!isAuthenticated && (
              <div className="hidden">
                 {/* Links removed as requested */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


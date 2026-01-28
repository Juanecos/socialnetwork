import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import AuthService from '../services/auth.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const response = await api.get('/auth/login', { 
        params: {email, password}
       });
      
      if (response.data.accessToken) {
        AuthService.setToken(response.data.accessToken);
        // También podríamos guardar el usuario si lo necesitamos
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      navigate('/');
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        if (error.response) {
        setError(error.response.data.message || 'Error desconocido');
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen flex items-center justify-center px-4 -mt-8">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-primary-600 rounded-xl items-center justify-center mb-4">
              <span className="text-white font-bold text-3xl">⃤</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-100">
              Bienvenido de nuevo
            </h2>
            <p className="text-slate-400 mt-2">Inicia sesión en tu cuenta</p>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          <form method="get" onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Login;


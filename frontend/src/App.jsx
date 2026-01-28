import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { ProtectedRoute, PublicRoute } from './components/RouteGuards';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas (Solo accesibles si NO estás logueado) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas Protegidas (Solo accesibles si ESTÁS logueado) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>

        {/* Ruta por defecto para 404 - redirige al home (que redirigirá al login si no hay auth) */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import { jwtDecode } from 'jwt-decode';

export const AuthService = {
  //* Guardar token
  setToken(token) {
    localStorage.setItem('authToken', token);
  },

  //* Obtener token
  getToken() {
    return localStorage.getItem('authToken');
  },

  //* Obtener datos del usuario con el token
  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  },

  //* Obtener solo el ID del usuario
  getCurrentUserId() {
    const user = this.getCurrentUser();
    return user ? user.sub : null;
  },

  //* Verificar si está autenticado (y token no expirado)
  isAuthenticated() {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    //* Verificar expiración si existe el campo exp
    if (user.exp) {
      return Date.now() < user.exp * 1000;
    }
    return true;
  },

  //* Cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export default AuthService;

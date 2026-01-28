import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import { validateRegisterForm } from '../utils/validations/registerValidation';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //* Validar formulario cada vez que cambian los datos
  useEffect(() => {
    const newErrors = validateRegisterForm(formData);
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const mapGenderToApi = (gender) => {
    const map = {
      'masculino': 'male',
      'femenino': 'female',
      'otro': 'other'
    };
    return map[gender] || 'other';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError('');
    setIsLoading(true);
    
    //* Marcar todos los campos como tocados al intentar enviar
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      gender: true,
      age: true
    });
    
    if (!isFormValid) {
      setIsLoading(false);
      return;
    }
    
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        profile: {
          name: formData.name,
          gender: mapGenderToApi(formData.gender),
          age: parseInt(formData.age, 10)
        }
      };

      await api.post('/auth/register', payload);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrarse', error);
      setApiError(error.response?.data?.message || 'Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-primary-600 rounded-xl items-center justify-center mb-4">
              <span className="text-white font-bold text-3xl">⃤</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-100">
              Crear Cuenta
            </h2>
            <p className="text-slate-400 mt-2">Crea una cuenta para comenzar a publicar</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {apiError && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm text-center">
                {apiError}
              </div>
            )}

            <Input
              label="Nombre completo"
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name ? errors.name : ''}
              required
            />
            
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="tu@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : ''}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-slate-300 mb-2">
                  Género <span className="text-red-400">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field w-full px-4 py-2 rounded-lg border bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                {touched.gender && errors.gender && (
                  <p className="mt-1 text-sm text-red-400">{errors.gender}</p>
                )}
              </div>
              
              <Input
                label="Edad"
                type="number"
                name="age"
                placeholder="18"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.age ? errors.age : ''}
                required
              />
            </div>
            
            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ''}
              required
            />
            
            <Input
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;

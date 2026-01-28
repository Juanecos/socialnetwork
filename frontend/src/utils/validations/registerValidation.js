export const validateRegisterForm = (formData) => {
  const newErrors = {};
  
  //* Validar nombre
  if (!formData.name.trim()) {
    newErrors.name = 'El nombre es requerido';
  }
  
  //* Validar email
  if (!formData.email.trim()) {
    newErrors.email = 'El correo electrónico es requerido';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Correo electrónico inválido';
  }
  
  //* Validar contraseña
  if (!formData.password) {
    newErrors.password = 'La contraseña es requerida';
  } else if (formData.password.length < 8) {
    newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
  }
  
  //* Validar confirmación de contraseña
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Debes confirmar la contraseña';
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Las contraseñas no coinciden';
  }
  
  //* Validar género
  if (!formData.gender) {
    newErrors.gender = 'El género es requerido';
  }
  
  //* Validar edad
  if (!formData.age) {
    newErrors.age = 'La edad es requerida';
  } else if (formData.age < 13 || formData.age > 120) {
    newErrors.age = 'La edad debe estar entre 13 y 120 años';
  }
  
  return newErrors;
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../services/api';
import FormInput from '../ui/FormInput/FormInput';
import Checkbox from '../ui/Checkbox/Checkbox';
import FormButton from '../ui/FormButton/FormButton';
import FormBody from '../ui/FormBody/FormBody';
import './RegisterPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,}$/;

const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!data.last_name.trim()) {
    errors.last_name = 'El apellido es obligatorio.';
  } else if (data.last_name.trim().length < 2) {
    errors.last_name = 'El apellido debe tener al menos 2 caracteres.';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Ingresa un email válido.';
  }

  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    errors.phone = 'Ingresa un teléfono válido (ej: +52 55 1234 5678).';
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (data.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (!data.consent) {
    errors.consent = 'Debes aceptar los términos y condiciones.';
  }

  return errors;
};

const FormRegisterEstudiantes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      phone: formData.phone?.trim() ? formData.phone.trim() : null,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { consent: _consent, ...payload } = formData;
      await postData(payload, 'auth/register/user');
      navigate('/login');
    } catch (error) {
      const data = error.response?.data;
      if (data?.email) {
        setErrors((prev) => ({
          ...prev,
          email: 'Este email ya está registrado.',
        }));
      } else if (data?.phone) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Este teléfono ya está registrado.',
        }));
      } else {
        setServerError(
          'Ocurrió un error al registrarte. Intenta de nuevo más tarde.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBody
      wrapperClassName='register-wrapper'
      cardClassName='register-card'
      title='Crear Cuenta'
      titleClassName='register-title'
      subtitle='Completa tus datos para empezar'
      subtitleClassName='register-subtitle'
      formClassName='register-form'
      onSubmit={handleSubmit}
    >
      <div className='row'>
        <FormInput
          label='Nombre'
          name='name'
          onChange={handleChange}
          required
          error={errors.name}
        />
        <FormInput
          label='Apellido'
          name='last_name'
          onChange={handleChange}
          required
          error={errors.last_name}
        />
      </div>
      <FormInput
        label='Email'
        name='email'
        type='email'
        onChange={handleChange}
        required
        placeholder='ejemplo@correo.com'
        error={errors.email}
      />
      <FormInput
        label='Teléfono'
        name='phone'
        onChange={handleChange}
        placeholder='Opcional'
        error={errors.phone}
      />
      <FormInput
        label='Contraseña'
        name='password'
        type='password'
        onChange={handleChange}
        required
        error={errors.password}
      />
      <Checkbox
        label='Acepto los términos, condiciones y el tratamiento de mis datos'
        name='consent'
        onChange={handleChange}
        required
        error={errors.consent}
        checked={formData.consent}
      />

      {serverError && <p className='error-server'>{serverError}</p>}

      <FormButton
        loading={loading}
        text='Crear Cuenta'
        loadingText='Registrando...'
      />
    </FormBody>
  );
};

export default FormRegisterEstudiantes;

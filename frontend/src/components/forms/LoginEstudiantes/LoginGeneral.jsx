import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import FormInput from '../../ui/FormInput/FormInput';
import FormButton from '../../ui/FormButton/FormButton';
import FormBody from '../../ui/FormBody/FormBody';
import './LoginGeneral.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,}$/;

const validate = (data) => {
  const errors = {};

  if (!data.identifier.trim()) {
    errors.identifier = 'El email o teléfono es obligatorio.';
  } else if (
    !EMAIL_REGEX.test(data.identifier) &&
    !PHONE_REGEX.test(data.identifier)
  ) {
    errors.identifier = 'Ingresa un email o teléfono válido.';
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.';
  }

  return errors;
};

function LoginGeneral() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
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
      const { remember: _remember, ...payload } = formData;
      await login(payload);
      navigate('/Pasantias');
    } catch (error) {
      const data = error.response?.data;
      setServerError(
        data?.detail ||
          'Email/teléfono o contraseña incorrectos. Intenta de nuevo.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBody
      wrapperClassName='zfll-login-wrapper'
      cardClassName='zfll-login-card'
      logo='L'
      logoClassName='zfll-login-logo'
      title='Bienvenido de nuevo'
      titleClassName='zfll-login-title'
      subtitle={
        <>
          ¿No tienes cuenta?{' '}
          <Link to='/register' className='zfll-login-link'>
            Regístrate gratis
          </Link>
        </>
      }
      subtitleClassName='zfll-login-subtitle'
      formClassName='zfll-login-form'
      onSubmit={handleSubmit}
      footer={
        <>
          <div className='zfll-login-divider'>
            <span>O continuar con</span>
          </div>
          <div className='zfll-social-logins'>
            <button
              type='button'
              className='zfll-social-btn zfll-social-google'
            >
              <FcGoogle className='zfll-social-icon' />
            </button>
            <button
              type='button'
              className='zfll-social-btn zfll-social-facebook'
            >
              <FaFacebook className='zfll-social-icon' />
            </button>
            <button
              type='button'
              className='zfll-social-btn zfll-social-instagram'
            >
              <FaInstagram className='zfll-social-icon' />
            </button>
          </div>
        </>
      }
    >
      <FormInput
        label='Email o Teléfono'
        name='identifier'
        type='text'
        onChange={handleChange}
        placeholder='ejemplo@email.com o +57 301 234 5678'
        error={errors.identifier}
        className='zfll-login-group'
        labelClassName='zfll-login-label'
        containerClassName='zfll-label-error-container'
        inputClassName='zfll-input'
        inputErrorClassName='zfll-input-error'
        errorClassName='zfll-error-message'
      />

      <FormInput
        label='Contraseña'
        name='password'
        type='password'
        onChange={handleChange}
        placeholder='********'
        error={errors.password}
        className='zfll-login-group'
        labelClassName='zfll-login-label'
        containerClassName='zfll-label-error-container'
        inputClassName='zfll-input'
        inputErrorClassName='zfll-input-error'
        errorClassName='zfll-error-message'
      />

      {serverError && <p className='zfll-error-server'>{serverError}</p>}

      <div className='zfll-login-options'>
        <label className='zfll-login-remember'>
          <input
            type='checkbox'
            name='remember'
            checked={formData.remember}
            onChange={handleChange}
          />
          Recordarme
        </label>

        <a href='#' className='zfll-login-link'>
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <FormButton
        loading={loading}
        text='Ingresar'
        loadingText='Ingresando...'
      />
    </FormBody>
  );
}

export default LoginGeneral;

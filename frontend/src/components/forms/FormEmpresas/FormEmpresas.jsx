import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../../services/api';
import FormInput from '../../ui/FormInput/FormInput';
import Checkbox from '../../ui/Checkbox/Checkbox';
import FormButton from '../../ui/FormButton/FormButton';
import FormBody from '../../ui/FormBody/FormBody';
import './FormEmpresas.css';

const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre de la empresa es obligatorio.';
  }

  if (!data.description.trim()) {
    errors.description = 'La descripción es obligatoria.';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un email válido.';
  }

  if (!data.entityType) {
    errors.entityType = 'Selecciona si eres empresa o institución.';
  }

  if (!data.consent) {
    errors.consent = 'Debes aceptar los términos y condiciones.';
  }

  return errors;
};

function FormEmpresas() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    entityType: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        formData.entityType === 'company'
          ? 'auth/register/company'
          : 'auth/register/institution';

      await postData(formData, endpoint);

      Swal.fire({
        icon: 'success',
        title: 'Registro enviado',
        text: 'Tu solicitud de registro ha sido enviada correctamente',
      });
      setFormData({
        name: '',
        description: '',
        email: '',
        entityType: '',
        consent: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al enviar tu solicitud',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBody
      wrapperClassName='zfem-wrapper'
      cardClassName='zfem-card'
      logo='L'
      logoClassName='zfem-logo'
      title='Registro de Empresa'
      titleClassName='zfem-title'
      subtitle={
        <>
          ¿Eres estudiante o practicante?{' '}
          <Link to='/register' className='zfem-link'>
            Regístrate aquí
          </Link>
          {' · '}
          ¿Ya tienes cuenta?{' '}
          <Link to='/login' className='zfem-link'>
            Inicia sesión
          </Link>
        </>
      }
      subtitleClassName='zfem-subtitle'
      formClassName='zfem-form'
      onSubmit={handleSubmit}
    >
      <FormInput
        label='Nombre de la empresa o institución'
        name='name'
        onChange={handleChange}
        required
        placeholder='Escribe el name'
        error={errors.name}
        className='zfem-group'
        labelClassName='zfem-group label'
        containerClassName='zfem-label-error-container'
        inputClassName='zfem-input'
        inputErrorClassName='zfem-input-error'
        errorClassName='zfem-error-message'
      />

      <FormInput
        label='Descripción'
        name='description'
        onChange={handleChange}
        required
        placeholder='Describe brevemente tu empresa o institución'
        multiline
        rows={4}
        error={errors.description}
        className='zfem-group'
        labelClassName='zfem-group label'
        containerClassName='zfem-label-error-container'
        inputClassName='zfem-input'
        inputErrorClassName='zfem-input-error'
        errorClassName='zfem-error-message'
      />

      <FormInput
        label='Email de contacto'
        name='email'
        type='email'
        onChange={handleChange}
        required
        placeholder='Escribe el correo de contacto'
        error={errors.email}
        className='zfem-group'
        labelClassName='zfem-group label'
        containerClassName='zfem-label-error-container'
        inputClassName='zfem-input'
        inputErrorClassName='zfem-input-error'
        errorClassName='zfem-error-message'
      />

      <div className='zfem-type-section'>
        <p className='zfem-type-label'>
          ¿Eres una empresa o institución de información?
        </p>
        <div className='zfem-type-options'>
          <label className='zfem-type-option'>
            <input
              type='checkbox'
              name='entityTypeCompany'
              checked={formData.entityType === 'company'}
              onChange={(e) => {
                const nextType = e.target.checked ? 'company' : '';
                setFormData((prev) => ({ ...prev, entityType: nextType }));
                if (errors.entityType) {
                  setErrors((prev) => ({ ...prev, entityType: undefined }));
                }
              }}
            />
            Empresa
          </label>
          <label className='zfem-type-option'>
            <input
              type='checkbox'
              name='entityTypeInstitution'
              checked={formData.entityType === 'institution'}
              onChange={(e) => {
                const nextType = e.target.checked ? 'institution' : '';
                setFormData((prev) => ({ ...prev, entityType: nextType }));
                if (errors.entityType) {
                  setErrors((prev) => ({ ...prev, entityType: undefined }));
                }
              }}
            />
            Institución
          </label>
        </div>
        <span
          className={`zfem-error-message zfem-type-error${errors.entityType ? ' is-visible' : ''}`}
        >
          {errors.entityType || '\u00A0'}
        </span>
      </div>

      <div className='zfem-options'>
        <Checkbox
          label='Acepto los términos, condiciones y el tratamiento de mis datos'
          name='consent'
          onChange={handleChange}
          required
          error={errors.consent}
          checked={formData.consent}
        />
      </div>

      <FormButton
        loading={loading}
        text='Enviar solicitud de registro'
        loadingText='Enviando...'
      />
    </FormBody>
  );
}

export default FormEmpresas;

import React, { useState } from 'react';
import './Configuracion.css';
import { Bell, Lock, Eye, Trash2, Save, X } from 'lucide-react';

function Configuracion() {
  const [settings, setSettings] = useState({
    notificacionesEmail: true,
    notificacionesSMS: false,
    notificacionesPostulaciones: true,
    notificacionesEntrevistas: true,
    notificacionesMensajes: true,
    visibilidadPerfil: true,
    mostrarEmpresa: true,
    permiteContactoExterno: true
  });

  const [passwordForm, setPasswordForm] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavePassword = () => {
    if (passwordForm.nueva === passwordForm.confirmar) {
      alert('Contraseña actualizada (simulación)');
      setPasswordForm({ actual: '', nueva: '', confirmar: '' });
      setShowPasswordForm(false);
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  const handleSaveNotifications = () => {
    alert('Configuración de notificaciones guardada');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro? Esta acción no se puede deshacer.')) {
      alert('Cuenta eliminada (simulación)');
    }
  };

  return (
    <div className="configuracion-container">
      <div className="config-header">
        <h1>Configuración</h1>
        <p>Administra tus preferencias y seguridad</p>
      </div>

      <div className="config-content">
        {/* Notificaciones */}
        <div className="config-section">
          <div className="section-header">
            <Bell size={24} />
            <div>
              <h2>Notificaciones</h2>
              <p>Controla cómo quieres recibir actualizaciones</p>
            </div>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notificaciones por Email</h4>
                <p>Recibe alertas sobre postulaciones y actividad en tu cuenta</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notificacionesEmail}
                  onChange={() => handleToggle('notificacionesEmail')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Notificaciones por SMS</h4>
                <p>Recibe mensajes de texto para alertas importantes</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notificacionesSMS}
                  onChange={() => handleToggle('notificacionesSMS')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Nuevas Postulaciones</h4>
                <p>Notificaciones cuando alguien se postula a tus ofertas</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notificacionesPostulaciones}
                  onChange={() => handleToggle('notificacionesPostulaciones')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Entrevistas Programadas</h4>
                <p>Recordatorios para tus entrevistas agendadas</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notificacionesEntrevistas}
                  onChange={() => handleToggle('notificacionesEntrevistas')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Mensajes Nuevos</h4>
                <p>Notificaciones cuando recibes mensajes de candidatos</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notificacionesMensajes}
                  onChange={() => handleToggle('notificacionesMensajes')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <button className="btn-primary" onClick={handleSaveNotifications}>
            <Save size={18} />
            Guardar Notificaciones
          </button>
        </div>

        {/* Privacidad */}
        <div className="config-section">
          <div className="section-header">
            <Eye size={24} />
            <div>
              <h2>Privacidad</h2>
              <p>Controla quién puede ver tu información</p>
            </div>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Perfil Visible</h4>
                <p>Permite que otros usuarios vean tu perfil de empresa</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.visibilidadPerfil}
                  onChange={() => handleToggle('visibilidadPerfil')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Mostrar Nombre de Empresa</h4>
                <p>Muestra el nombre de tu empresa en postulaciones</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.mostrarEmpresa}
                  onChange={() => handleToggle('mostrarEmpresa')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Permitir Contacto Externo</h4>
                <p>Permite que instituciones educativas te contacten</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.permiteContactoExterno}
                  onChange={() => handleToggle('permiteContactoExterno')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div className="config-section">
          <div className="section-header">
            <Lock size={24} />
            <div>
              <h2>Seguridad</h2>
              <p>Protege tu cuenta</p>
            </div>
          </div>

          {!showPasswordForm ? (
            <button className="btn-secondary" onClick={() => setShowPasswordForm(true)}>
              <Lock size={18} />
              Cambiar Contraseña
            </button>
          ) : (
            <div className="password-form">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  name="actual"
                  value={passwordForm.actual}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>

              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="nueva"
                  value={passwordForm.nueva}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>

              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmar"
                  value={passwordForm.confirmar}
                  onChange={handlePasswordChange}
                  placeholder="Confirma tu nueva contraseña"
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setShowPasswordForm(false)}>
                  <X size={18} />
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleSavePassword}>
                  <Save size={18} />
                  Guardar Contraseña
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Zona de Peligro */}
        <div className="config-section danger">
          <div className="section-header">
            <Trash2 size={24} />
            <div>
              <h2>Zona de Peligro</h2>
              <p>Acciones irreversibles</p>
            </div>
          </div>

          <div className="danger-message">
            <p>Una vez que elimines tu cuenta, no hay vuelta atrás. Asegúrate de estar completamente seguro.</p>
          </div>

          <button className="btn-danger" onClick={handleDeleteAccount}>
            <Trash2 size={18} />
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
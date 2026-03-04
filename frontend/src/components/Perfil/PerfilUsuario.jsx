import { useEffect, useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { profileService } from '../../services/profile';
import { useAuth } from '../../contexts/AuthContext';

export default function PerfilUsuario() {
  const { refreshUser } = useAuth();

  const [saved, setSaved] = useState({ name: '', last_name: '', phone: '', email: '', is_hired: false });
  const [form, setForm] = useState({ ...saved });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    profileService.get('user').then((data) => {
      const values = {
        name: data.name || '',
        last_name: data.last_name || '',
        phone: data.phone ?? '',
        email: data.email || '',
        is_hired: data.is_hired ?? false,
      };
      setSaved(values);
      setForm(values);
      setLoading(false);
    });
  }, []);

  const handleEdit = () => { setForm({ ...saved }); setIsEditing(true); setError(''); };
  const handleCancel = () => { setForm({ ...saved }); setIsEditing(false); setError(''); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const { name, last_name, phone, is_hired } = form;
      const payload = { name, last_name, is_hired, ...(phone !== '' && { phone: Number(phone) }) };
      await profileService.update('user', payload);
      setSaved({ ...form });
      setIsEditing(false);
      await refreshUser();
    } catch (err) {
      setError(
        err.response?.data
          ? Object.values(err.response.data).flat().join(' ')
          : 'Error al guardar los cambios.',
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="perfil-loading"><div className="perfil-spinner" /></div>;

  return (
    <div className="perfil-form">
      <div className="perfil-form-header">
        <div>
          <h3 className="perfil-title">Información personal</h3>
          <p className="perfil-subtitle">Actualiza tus datos de perfil</p>
        </div>
        <button
          type="button"
          className={`perfil-btn-edit ${isEditing ? 'cancel' : ''}`}
          onClick={isEditing ? handleCancel : handleEdit}
        >
          {isEditing ? <><X size={15} /> Cancelar</> : <><Edit2 size={15} /> Editar</>}
        </button>
      </div>

      <div className="perfil-grid">
        <Campo label="Nombre" name="name" value={isEditing ? form.name : saved.name} onChange={handleChange} disabled={!isEditing} />
        <Campo label="Apellido" name="last_name" value={isEditing ? form.last_name : saved.last_name} onChange={handleChange} disabled={!isEditing} />
        <Campo label="Teléfono" name="phone" type="number" value={isEditing ? form.phone : saved.phone} onChange={handleChange} disabled={!isEditing} />
        <Campo label="Correo electrónico" name="email" value={saved.email} onChange={() => {}} disabled />
      </div>

      <div className="perfil-check-row">
        <input
          type="checkbox"
          id="is_hired"
          name="is_hired"
          checked={isEditing ? form.is_hired : saved.is_hired}
          onChange={handleChange}
          disabled={!isEditing}
          className="perfil-checkbox"
        />
        <label htmlFor="is_hired" className="perfil-check-label">Actualmente contratado</label>
      </div>

      {error && <p className="perfil-error">{error}</p>}

      {isEditing && (
        <div className="perfil-actions">
          <button type="button" className="perfil-btn-save" onClick={handleSave} disabled={saving}>
            <Save size={15} /> {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      )}
    </div>
  );
}

function Campo({ label, name, value, onChange, disabled, type = 'text' }) {
  return (
    <div className="campo-group">
      <label className="campo-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        className={`campo-input ${disabled ? 'disabled' : ''}`}
      />
    </div>
  );
}

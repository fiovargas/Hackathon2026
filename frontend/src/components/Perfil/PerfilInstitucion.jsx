import { useEffect, useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { profileService } from '../../services/profile';
import { useAuth } from '../../contexts/AuthContext';

export default function PerfilInstitucion() {
  const { refreshUser } = useAuth();

  const [saved, setSaved] = useState({ name: '', description: '', email: '' });
  const [form, setForm] = useState({ ...saved });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    profileService.get('institution').then((data) => {
      const values = {
        name: data.name || '',
        description: data.description || '',
        email: data.email || '',
      };
      setSaved(values);
      setForm(values);
      setLoading(false);
    });
  }, []);

  const handleEdit = () => { setForm({ ...saved }); setIsEditing(true); setError(''); };
  const handleCancel = () => { setForm({ ...saved }); setIsEditing(false); setError(''); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const { name, description } = form;
      await profileService.update('institution', { name, description });
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
          <h3 className="perfil-title">Información de la institución</h3>
          <p className="perfil-subtitle">Administra los datos públicos de tu institución</p>
        </div>
        <button
          type="button"
          className={`perfil-btn-edit ${isEditing ? 'cancel' : ''}`}
          onClick={isEditing ? handleCancel : handleEdit}
        >
          {isEditing ? <><X size={15} /> Cancelar</> : <><Edit2 size={15} /> Editar</>}
        </button>
      </div>

      <div className="perfil-grid perfil-grid-1">
        <Campo label="Nombre de la institución" name="name" value={isEditing ? form.name : saved.name} onChange={handleChange} disabled={!isEditing} />
        <Campo label="Correo electrónico" name="email" value={saved.email} onChange={() => {}} disabled />
        <Campo label="Descripción" name="description" value={isEditing ? form.description : saved.description} onChange={handleChange} disabled={!isEditing} multiline />
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

function Campo({ label, name, value, onChange, disabled, multiline = false }) {
  return (
    <div className="campo-group">
      <label className="campo-label">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          rows={4}
          className={`campo-input campo-textarea ${disabled ? 'disabled' : ''}`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          className={`campo-input ${disabled ? 'disabled' : ''}`}
        />
      )}
    </div>
  );
}

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { profileService } from '../../services/profile';
import { useAuth } from '../../contexts/AuthContext';

export default function AvatarUpload({ imageUrl, name }) {
  const { refreshUser } = useAuth();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initials = name
    ? name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : '?';

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setError('');
    setLoading(true);
    try {
      const { image_url } = await profileService.uploadAvatar(file);
      setPreview(image_url);
      await refreshUser();
    } catch {
      setError('No se pudo subir la imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="avatar-upload-wrapper">
      <div
        className="avatar-circle"
        onClick={() => inputRef.current?.click()}
        title="Cambiar foto"
      >
        {preview ? (
          <img src={preview} alt="Avatar" className="avatar-img" />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
        <div className="avatar-overlay">
          <Upload size={20} color="white" />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {loading && <p className="avatar-hint">Subiendo...</p>}
      {error && <p className="avatar-error">{error}</p>}
      {!loading && !error && <p className="avatar-hint">Clic para cambiar foto</p>}

      <style>{`
        .avatar-upload-wrapper { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .avatar-circle { position: relative; width: 96px; height: 96px; border-radius: 50%; overflow: hidden; cursor: pointer; background: #7AAC21; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.15); }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-initials { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #fff; font-size: 28px; font-weight: 700; }
        .avatar-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; }
        .avatar-circle:hover .avatar-overlay { opacity: 1; }
        .avatar-hint { font-size: 12px; color: #6b7280; margin: 0; }
        .avatar-error { font-size: 12px; color: #ef4444; margin: 0; }
      `}</style>
    </div>
  );
}

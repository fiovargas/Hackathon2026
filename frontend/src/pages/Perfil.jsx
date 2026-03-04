import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AvatarUpload from '../components/Perfil/AvatarUpload';
import PerfilUsuario from '../components/Perfil/PerfilUsuario';
import PerfilEmpresa from '../components/Perfil/PerfilEmpresa';
import PerfilInstitucion from '../components/Perfil/PerfilInstitucion';
import './Perfil.css';

// ─── Mapeo de roles → entidad ──────────────────────
// 1 Administrador, 2 Aspirante, 3 Practicante → usuario
// 4 Empresa                                   → empresa
// 5 Institución de formación                  → institución

const USER_ROLES      = [1, 2, 3];
const COMPANY_ROLE    = 4;
const INSTITUTION_ROLE = 5;

function resolveEntity(role) {
  if (USER_ROLES.includes(role))  return 'user';
  if (role === COMPANY_ROLE)      return 'company';
  if (role === INSTITUTION_ROLE)  return 'institution';
  return null;
}

const LABELS = {
  user:        { title: 'Mi perfil',              subtitle: 'Administra tu información personal.' },
  company:     { title: 'Perfil de empresa',       subtitle: 'Administra los datos públicos de tu empresa.' },
  institution: { title: 'Perfil de institución',  subtitle: 'Administra los datos públicos de tu institución.' },
};

const FORM = {
  user:        PerfilUsuario,
  company:     PerfilEmpresa,
  institution: PerfilInstitucion,
};

export default function Perfil() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="perfil-page">
        <div className="perfil-container">
          <div className="perfil-loading"><div className="perfil-spinner" /></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  const entityType = resolveEntity(user.role);

  if (!entityType) {
    return (
      <div className="perfil-page">
        <div className="perfil-container">
          <p className="perfil-error">Rol de usuario no reconocido.</p>
        </div>
      </div>
    );
  }

  const FormComponent = FORM[entityType];
  const { title, subtitle } = LABELS[entityType];

  const displayName =
    entityType === 'user'
      ? `${user.name || ''} ${user.last_name || ''}`.trim()
      : user.name || '';

  return (
    <div className="perfil-page">
      <div className="perfil-container">

        {/* Encabezado de página */}
        <div className="perfil-page-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {/* Tarjeta de avatar */}
        <div className="perfil-avatar-card">
          <AvatarUpload imageUrl={user.image_url} name={displayName} />
          <p className="perfil-avatar-name">{displayName || '—'}</p>
          <span className="perfil-role-badge">{user.role_name ?? entityType}</span>
        </div>

        {/* Formulario según entidad */}
        <div className="perfil-card">
          <FormComponent />
        </div>

      </div>
    </div>
  );
}

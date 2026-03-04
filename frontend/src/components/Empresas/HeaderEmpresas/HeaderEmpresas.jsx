import React, { useState } from 'react';
import './HeaderEmpresas.css';
import { Search, Bell, User } from 'lucide-react';
import logoLima from '../../../assets/LogoLima.png';

function HeaderEmpresas({ onSearch, isSidebarOpen }) {
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nueva postulación de Juan Pérez', time: '2 min' },
    { id: 2, message: 'Entrevista programada para María Rodríguez', time: '1 hora' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className={`header-empresas ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <div className="header-content">
        {/* Logo y Título */}
        <div className="header-brand">
          <div className="brand-logo">
            <img src={logoLima} alt="La Lima" />
          </div>
          <div className="brand-text">
            <h1>Bolsa de Empleo</h1>
            <p>La Lima</p>
          </div>
        </div>

        {/* Buscador */}
        <div className="header-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Buscar candidatos..."
            value={searchValue}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Acciones */}
        <div className="header-actions">
          {/* Notificaciones */}
          <div className="notification-container">
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="notification-badge">{notifications.length}</span>
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notificaciones</h3>
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div key={notif.id} className="notification-item">
                        <p className="notif-message">{notif.message}</p>
                        <p className="notif-time">{notif.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No hay notificaciones</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Perfil Usuario */}
          <button className="profile-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderEmpresas;
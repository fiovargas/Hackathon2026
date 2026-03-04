import React from 'react';
import './SidebarEmpresas.css';
import { Menu, X, Home, Briefcase, Users, User, Settings, LogOut } from 'lucide-react';

function SidebarEmpresas({ activeSection, setActiveSection, isOpen, setIsOpen }) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Panel de Control', icon: Home },
    { id: 'ofertas', label: 'Mis Ofertas', icon: Briefcase },
    { id: 'candidatos', label: 'Candidatos', icon: Users },
    { id: 'perfil', label: 'Perfil de Empresa', icon: User },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Header del Sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-avatar">N</div>
            <div className={`brand-info ${!isOpen ? 'hidden' : ''}`}>
              <h3>Nextern Costa Rica</h3>
              <p>Dispositivos Médicos</p>
            </div>
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menú Principal */}
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
                title={!isOpen ? item.label : ''}
              >
                <Icon size={20} className="menu-icon" />
                {isOpen && <span className="menu-label">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={18} />
            {isOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default SidebarEmpresas;
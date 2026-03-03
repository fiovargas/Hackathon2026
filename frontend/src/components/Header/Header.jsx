import React from 'react';
import Navbar from '../Navbar/Navbar';
const Header = ({ children, backgroundImage }) => {
  return (
    <header
      className="header-container"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenido opcional dentro del header */}
      {children && <div className="header-content">{children}</div>}
    </header>
  );
};

export default Header;
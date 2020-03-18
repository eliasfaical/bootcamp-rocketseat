import React from 'react';

import './style.css';

function Header({ tech, onDelete }) {
  return(
    <header className="site-header">
      <div className="container">
        <h1>Facebook</h1>
        <a href="#" className="btn-perfil">
          Meu perfil
          <span className="ico-perfil"></span>
        </a>
      </div>
    </header>
  );
}

export default Header;
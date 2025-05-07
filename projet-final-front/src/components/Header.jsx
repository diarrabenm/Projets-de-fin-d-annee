import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png'; // Assurez-vous que le chemin est correct
import profile from './profile.png'; // Assurez-vous que le chemin est correct
function Navbar() {
  return (
    <nav className="reddit-navbar">
      <div className="navbar-container">
        {/* Logo et nom */}
        <div className="navbar-brand">
        <Link to="/home" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="brand-name">hetic connect</span>
          </Link>
        </div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input type="text" placeholder="Rechercher Reddit" />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Navigation principale */}
        <div className="nav-links">
          <Link to="/popular" className="nav-link">
            <i className="fas fa-fire"></i>
            <span>Populaire</span>
          </Link>
          <Link to="/all" className="nav-link">
            <i className="fas fa-globe"></i>
            <span>Tout</span>
          </Link>
          <Link to="/" className="profile-link">
            <i className="fas fa-bolt"></i>
            <img src= {profile} alt = '20' className='20'  />
            <span></span>
          </Link>
        </div>
        
          
        {/* Actions utilisateur */}
        <div className="user-actions">
          <button className="create-post-btn">
            <i className="fas fa-plus"></i>
            <span>Creer</span>
          </button>
          <div className="user-menu">
            <i className="fas fa-user-circle user-icon"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
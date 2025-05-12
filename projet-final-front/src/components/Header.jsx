import { Link } from 'react-router-dom';
import './Header.css'; // Assurez-vous d'inclure tous les styles nécessaires
import logo from './logo.png';
import profile from './profile.png';
import RightSidebar from './RightSidebar'; // 👈 Ajout de l'import ici

function Header() {
  return (
    <div className="header-container">
      {/* Navbar */}
      <nav className="reddit-navbar">
        <div className="navbar-left">
          <Link to="/home" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="brand-name">hetic connect</span>
          </Link>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Rechercher Reddit" />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="navbar-right">
          <div className="nav-links">
            <Link to="/popular" className="nav-link">
              <i className="fas fa-fire"></i>
              <span>Populaire</span>
            </Link>
            <Link to="/all" className="nav-link">
              <i className="fas fa-globe"></i>
              <span>Tout</span>
            </Link>
          </div>

          <button className="icon-button">
            <i className="fas fa-plus"></i>
          </button>

          <div className="user-menu">
            <Link to="/profile" className="nav-link">
              <img src={profile} alt="profil" className="profile-icon" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>HETIC CONNECT</span>
        </div>

        <nav className="sidebar-links">
          <Link to="/home">
            <i className="fas fa-home"></i> Accueil
          </Link>
          <Link to="/popular">
            <i className="fas fa-fire"></i> Populaire
          </Link>
          <Link to="/new">
            <i className="fas fa-bolt"></i> Nouveautés
          </Link>
          <Link to="/communities">
            <i className="fas fa-users"></i> Communautés
          </Link>
          <Link to="/messages">
            <i className="fas fa-envelope"></i> Messages
          </Link>
          <Link to="/saved">
            <i className="fas fa-bookmark"></i> Enregistré
          </Link>
          <Link to="/profile">
            <i className="fas fa-user"></i> Profil
          </Link>
          <Link to="/settings">
            <i className="fas fa-cog"></i> Paramètres
          </Link>
          <Link to="/logout">
            <i className="fas fa-sign-out-alt"></i> Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Right Sidebar ajouté ici 👇 */}
      <RightSidebar />
    </div>
  );
}

export default Header;

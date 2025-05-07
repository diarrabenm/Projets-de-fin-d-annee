import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
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
  );
}

export default Sidebar;


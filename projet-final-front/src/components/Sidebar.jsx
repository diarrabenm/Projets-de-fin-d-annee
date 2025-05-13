import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span> MENU </span>
      </div>

      <nav className="sidebar-links">
        <Link to="/home">
          <i className="fas fa-home"></i> Accueil
        </Link>
        <Link to="/profile">
          <i className="fas fa-fire"></i> profils
        </Link>
        <Link to="/create-post">
          <i className="fas fa-bolt"></i> CreatePost
        </Link>
        <Link to="/communaute">
          <i className="fas fa-users"></i> Communauté
        </Link>
        <Link to="/messages">
          <i className="fas fa-envelope"></i> Messages
        </Link>
      
        <Link to="/Publicité">
          <i className="fas fa-cog"></i> Publicité
        </Link>
        <Link to="/explore">
          <i className="fas fa-sign-out-alt"></i> explore
        </Link>
        <Link to="login">
          <i className="fas fa-sign-out-alt"></i> login
        </Link>
        <Link to="/logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
        <Link to="/tous">
          <i className="fas fa-sign-out-alt"></i> Tous
        </Link>
        <Link to="/Apropos de reddit">
          <i className="fas fa-sign-out-alt"></i> Apropos de reddit
        </Link>
        <Link to="/parametre">
          <i className="fas fa-sign-out-alt"></i> parametre
        </Link>
        <Link to="/reddit probetar">
          <i className="fas fa-sign-out-alt"></i> Reddit probetar
        </Link>
        

      </nav>
    </aside>
  );
}

export default Sidebar;


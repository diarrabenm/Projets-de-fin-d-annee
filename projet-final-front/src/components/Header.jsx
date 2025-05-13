import { Link } from 'react-router-dom';
import './Header.css'; // Assurez-vous d'inclure tous les styles nécessaires
import logo from './logo.png';
import profile from './profile.png';
import RightSidebar from './RightSidebar';

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
          <span>MENU</span>
      </div>

        <nav className="sidebar-links">
        <Link to="/home">
         <i className="fas fa-home"></i> Accueil
        </Link>

         <Link to="/profile">
         <i className="fas fa-users"></i> Profile
         </Link>

        <Link to="/CreatePost">
          <i className="fas fa-user"></i> Creer un post
        </Link>

        <Link to="/settings">
         <i className="fas fa-cog"></i> Communauté
        </Link>

       
        <Link to="/CreateSubreddit">
          <i className="fas fa-users"></i> Creer Communauté
        </Link>


     
       <Link to="/explore">
        <i className="fas fa-compass"></i> Explore
       </Link>

       <Link to="/">
        <i className="fas fa-sign-out-alt"></i> Logout
       </Link>

    </nav>
      </aside>

      {/* Right Sidebar ajouté ici 👇 */}
      <RightSidebar />
    </div>
  );
}

export default Header;

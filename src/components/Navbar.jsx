import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <div className="navbar-content">
    <div
      className="logo-container"
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Link to="/"  style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/logo.png"
          alt="Raaya Logo"
          className='nav-logo'
         
        />
      </Link>
    </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/showcase" className={location.pathname === '/showcase' ? 'active' : ''}>
              Showcase
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

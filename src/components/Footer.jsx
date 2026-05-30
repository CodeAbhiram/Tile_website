import { Link } from 'react-router-dom';

function Footer() {
  const phoneNumber = '919876543210'; // Replace with actual phone number
  const email = 'info@tilecraft.com'; // Replace with actual email
  const address = '123 Design Street, Creative City, CC 12345'; // Replace with actual address

  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-grid">

      <div className="footer-brand">
            <div
      className="logo-container"
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/logo.png"
          alt="Raaya Logo"
          className='footer-logo'
        
        />
      </Link>
    </div>
        <p>
          Luxury tiles for discerning spaces.
          Curated collections that bring timeless
          elegance to modern interiors.
        </p>
      </div>

      <div className="footer-links">
        <h4>Navigation</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/showcase">Collection</Link></li>
        </ul>
      </div>

      <div className="footer-contact">
        <h4>Contact</h4>

        <p>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </p>

        <p>
          <a href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      </div>

      <div className="footer-contact">
        <h4>Showroom</h4>
        <p>{address}</p>
      </div>

    </div>

    <div className="footer-bottom">
      <p>
        © {new Date().getFullYear()} Raaya.
        All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
}

export default Footer;

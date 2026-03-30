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
            <h3>TileCraft</h3>
            <p>Luxury tiles for discerning spaces. Curated collections that define elegance.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/showcase">Collection</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Visit Us</h4>
            <p>{address}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TileCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

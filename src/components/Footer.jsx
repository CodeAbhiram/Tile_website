function Footer() {
  const phoneNumber = '919876543210'; // Replace with actual phone number

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>TileCraft</h3>
        <p>Your trusted partner for premium tiles</p>

        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/showcase">Showcase</a></li>
          <li><a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a></li>
        </ul>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TileCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

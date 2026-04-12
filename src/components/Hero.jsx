import { Link } from 'react-router-dom';

function Hero() {
  const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello, I would like to get a quote for tiles`;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Raya</h1>
        <p>Luxury in every layer</p>
        <div className="hero-buttons">
          <Link to="/showcase" className="btn btn-primary">
            Explore Collection
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Get Quote
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

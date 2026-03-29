function Hero() {
  const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi, I'm interested in your tile collection`;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Premium Tiles for Modern Spaces</h1>
        <p>Discover our curated collection of high-quality tiles that transform your vision into reality. From elegant marble finishes to durable outdoor solutions.</p>
        <div className="hero-buttons">
          <a href="/showcase" className="btn btn-secondary">
            Explore Collection
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

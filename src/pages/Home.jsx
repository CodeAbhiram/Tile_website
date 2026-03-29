import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ContactModal from '../components/ContactModal';

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already submitted the contact form
    const hasSubmitted = localStorage.getItem('contactFormSubmitted');
    if (!hasSubmitted) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    // Do NOT set localStorage here - we want it to show again if they just closed
  };

  const handleFormSuccess = () => {
    // Only mark as submitted when the form is successfully sent
    localStorage.setItem('contactFormSubmitted', 'true');
    setShowModal(false);
  };

  const handleReopenModal = () => {
    setShowModal(true);
  };

  const whyChooseUs = [
    {
      title: 'Premium Quality',
      description: 'Only the finest materials sourced from trusted suppliers.'
    },
    {
      title: 'Wide Selection',
      description: 'Hundreds of designs and patterns to choose from.'
    },
    {
      title: 'Expert Advice',
      description: 'Our team helps you choose the perfect tiles for your space.'
    },
    {
      title: 'Competitive Pricing',
      description: 'Best prices without compromising on quality.'
    }
  ];

  return (
    <>
      <Hero />

      {/* Floating reopen button */}
      <button className="floating-contact-btn" onClick={handleReopenModal} aria-label="Open contact form">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <Categories />

      <section className="section why-us">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="why-us-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-us-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && <ContactModal onClose={handleCloseModal} onSuccess={handleFormSuccess} />}
    </>
  );
}

export default Home;

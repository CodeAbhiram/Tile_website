import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FAQ from '../components/FAQ';
import ContactModal from '../components/ContactModal';

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('contactFormSubmitted');
    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSuccess = () => {
    localStorage.setItem('contactFormSubmitted', 'true');
    setShowModal(false);
  };

  const handleReopenModal = () => {
    setShowModal(true);
  };

  const whyChooseUs = [
    {
      title: 'Curated Excellence',
      description: 'Every tile in our collection is handpicked for exceptional quality and timeless design.'
    },
    {
      title: 'Design Expertise',
      description: 'Our design consultants bring decades of experience to help you create your perfect space.'
    },
    {
      title: 'Timeless Quality',
      description: 'We partner with master craftsmen to deliver tiles that endure through generations.'
    },
    {
      title: 'Personal Service',
      description: 'Your vision guides our process. We tailor every detail to reflect your unique style.'
    }
  ];

  return (
    <>
      <Hero />

      <button className="floating-contact-btn" onClick={handleReopenModal} aria-label="Open contact form">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <Categories />

      <section className="section why-us">
        <div className="container">
          <h2 className="section-title">Why TileCraft</h2>
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

      <FAQ />

      {showModal && <ContactModal onClose={handleCloseModal} onSuccess={handleFormSuccess} />}
    </>
  );
}

export default Home;

import { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: 'What types of tiles do you offer?',
    answer: 'We offer a curated selection of premium floor, wall, bathroom, and outdoor tiles. Each collection is sourced from top manufacturers to ensure the highest quality and design standards.'
  },
  {
    question: 'Can I get samples before purchasing?',
    answer: 'Yes! We provide complimentary samples so you can see and feel the tile quality in person. Contact us through the form or WhatsApp to request samples.'
  },
  {
    question: 'Do you provide installation services?',
    answer: 'We work with a network of certified installers and can recommend professionals for your project. We ensure your tiles are installed to the highest standards.'
  },
  {
    question: 'What is the lead time for orders?',
    answer: 'Lead times vary depending on the product and quantity. Typically, orders are delivered within 2-4 weeks. We\'ll provide an accurate timeline when you place your order.'
  },
  {
    question: 'How do I care for my tiles?',
    answer: 'Each tile type has specific care requirements. We provide detailed maintenance guides with your purchase to keep your tiles looking pristine for years.'
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq-section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

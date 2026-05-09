import { useState } from "react";

function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Support both single image (string) and multiple images (array)
  const images = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
  const message = `I am interested in ${product.name} (${product.size})`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const prev = (e) => {
    e.preventDefault();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.preventDefault();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .product-card {
          font-family: 'DM Sans', sans-serif;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          max-width: 360px;
          transition: box-shadow 0.3s ease;
        }
        .product-card:hover {
          box-shadow: 0 8px 36px rgba(0,0,0,0.14);
        }

        /* ── Carousel ── */
        .carousel {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f5f3f0;
          overflow: hidden;
        }
        .carousel-track {
          display: flex;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .carousel-slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          flex-shrink: 0;
        }
        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .carousel-slide .img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bbb;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        /* Nav arrows */
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.88);
          border: none;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 6px rgba(0,0,0,0.18);
          z-index: 2;
          transition: background 0.2s, transform 0.2s;
          padding: 0;
        }
        .carousel-btn:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.08);
        }
        .carousel-btn.prev { left: 10px; }
        .carousel-btn.next { right: 10px; }
        .carousel-btn svg { width: 16px; height: 16px; stroke: #333; }

        /* Dots */
        .carousel-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .dot.active {
          background: #fff;
          transform: scale(1.3);
        }

        /* Counter badge */
        .img-counter {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.45);
          color: #fff;
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 20px;
          z-index: 2;
          letter-spacing: 0.04em;
        }

        /* ── Product info ── */
        .product-info {
          padding: 1.2rem 1.25rem 1.4rem;
        }
        .product-category {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a07850;
          margin-bottom: 0.35rem;
        }
        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 0.5rem;
          line-height: 1.25;
        }
        .product-description {
          font-size: 0.83rem;
          color: #666;
          line-height: 1.55;
          margin: 0 0 0.5rem;
        }
        .product-size {
          font-size: 0.8rem;
          color: #888;
          margin: 0 0 1.1rem;
        }
        .btn-enquire {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
          color: #fff;
          text-decoration: none;
          padding: 0.65rem 1.2rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .btn-enquire:hover {
          background: #1ebe5a;
          transform: translateY(-1px);
        }
        .btn-enquire svg {
          width: 18px;
          height: 18px;
          fill: #fff;
          flex-shrink: 0;
        }
      `}</style>

      <div className="product-card">
        {/* ── Carousel ── */}
        <div className="carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.length > 0 ? (
              images.map((src, idx) => (
                <div className="carousel-slide" key={idx}>
                  <ImageSlide src={src} alt={`${product.name} ${idx + 1}`} />
                </div>
              ))
            ) : (
              <div className="carousel-slide">
                <div className="img-fallback">No Image Available</div>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              {/* Counter */}
              <span className="img-counter">
                {currentIndex + 1} / {images.length}
              </span>

              {/* Arrows */}
              <button className="carousel-btn prev" onClick={prev} aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="carousel-btn next" onClick={next} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="carousel-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot ${idx === currentIndex ? "active" : ""}`}
                    onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Info ── */}
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-size">Size: {product.size}</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-enquire">
            {/* WhatsApp icon */}
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C8.28 2 2 8.28 2 16c0 2.52.68 4.88 1.86 6.92L2 30l7.28-1.84A13.93 13.93 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4a11.37 11.37 0 01-5.8-1.58l-.42-.25-4.32 1.1 1.12-4.2-.27-.44A11.38 11.38 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6c6.3 0 11.4 5.1 11.4 11.4 0 6.3-5.1 11.4-11.4 11.4zm6.24-8.54c-.34-.17-2-.98-2.3-1.09-.3-.11-.52-.17-.74.17-.22.34-.86 1.09-1.05 1.31-.2.22-.39.25-.73.08-.34-.17-1.43-.53-2.73-1.68-1.01-.9-1.69-2.01-1.89-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.22-.34.34-.56.11-.22.06-.42-.03-.59-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56-.19-.01-.41-.01-.63-.01-.22 0-.57.08-.87.42-.3.34-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.17.22 2.3 3.51 5.57 4.92.78.34 1.38.54 1.85.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.39z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

// Isolated slide with its own error state
function ImageSlide({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return <div className="img-fallback">Image Not Available</div>;
  }
  return <img src={src} alt={alt} onError={() => setErrored(true)} />;
}

export default ProductCard;

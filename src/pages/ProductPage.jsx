import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/data.json";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <h2>Product Not Found</h2>
        </div>
      </section>
    );
  }

  const images = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const phoneNumber = "919876543210";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `I am interested in ${product.name} (${product.size})`
  )}`;

  /* =========================
     CAROUSEL CONTROLS
  ========================= */

  const prev = () => {
    if (images.length <= 1) return;
    setCurrentIndex(
      (i) => (i - 1 + images.length) % images.length
    );
  };

  const next = () => {
    if (images.length <= 1) return;
    setCurrentIndex(
      (i) => (i + 1) % images.length
    );
  };

  /* =========================
     LIGHTBOX CONTROLS (SYNCED)
  ========================= */

  const openPreview = () => setPreviewIndex(currentIndex);

  const closePreview = () => setPreviewIndex(null);

  const prevPreview = (e) => {
    if (e) e.stopPropagation();
    setPreviewIndex((i) =>
      i === null
        ? 0
        : (i - 1 + images.length) % images.length
    );
  };

  const nextPreview = (e) => {
    if (e) e.stopPropagation();
    setPreviewIndex((i) =>
      i === null
        ? 0
        : (i + 1) % images.length
    );
  };

  /* =========================
     BODY SCROLL LOCK
  ========================= */

  useEffect(() => {
    if (previewIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [previewIndex]);

  return (
    <section className="section">
      <div className="container">

        {/* ================= PRODUCT LAYOUT ================= */}
        <div className="product-page">

          {/* ================= CAROUSEL ================= */}
          <div className="product-gallery">
            <div className="carousel">

              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {images.length > 0 ? (
                  images.map((src, idx) => (
                    <div className="carousel-slide" key={idx}>
                      <img
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
                        loading="lazy"
                        className="clickable-image"
                        onClick={openPreview}
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-slide">
                    <div className="img-fallback">
                      No Image Available
                    </div>
                  </div>
                )}
              </div>

              {/* NAVIGATION */}
              {images.length > 1 && (
                <>
                  <span className="img-counter">
                    {currentIndex + 1} / {images.length}
                  </span>

                  <button className="carousel-btn prev" onClick={prev}>
                    ‹
                  </button>

                  <button className="carousel-btn next" onClick={next}>
                    ›
                  </button>

                  <div className="carousel-dots">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${
                          idx === currentIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="product-details">
            <div className="product-content">

              <div className="product-category">
                {product.category}
              </div>

              <h1 className="product-name">
                {product.name}
              </h1>

              <p className="product-description">
                {product.description}
              </p>

              <p className="product-size">
                Size: {product.size}
              </p>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-enquire"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* ================= LIGHTBOX ================= */}
        {previewIndex !== null && (
          <div
            className="image-modal"
            onClick={closePreview}
          >

            <button
              className="modal-nav left"
              onClick={prevPreview}
            >
              ‹
            </button>

            <img
              src={images[previewIndex]}
              alt="preview"
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="modal-nav right"
              onClick={nextPreview}
            >
              ›
            </button>

            <button
              className="close-btn"
              onClick={closePreview}
            >
              ✕
            </button>

          </div>
        )}

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <div className="related-products section">
            <h2 className="section-title">
              Similar Products
            </h2>

            <div className="product-grid">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default ProductPage;
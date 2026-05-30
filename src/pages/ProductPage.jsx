import { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/data.json";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <section className="section">
      <div className="container">

        {/* Product Details */}
        <div className="product-page">

          {/* Gallery */}
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
                    <div
                      className="carousel-slide"
                      key={idx}
                    >
                      <ImageSlide
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
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

              {images.length > 1 && (
                <>
                  <span className="img-counter">
                    {currentIndex + 1} / {images.length}
                  </span>

                  <button
                    className="carousel-btn prev"
                    onClick={prev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>

                  <button
                    className="carousel-btn next"
                    onClick={next}
                    aria-label="Next image"
                  >
                    ›
                  </button>

                  <div className="carousel-dots">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${
                          idx === currentIndex
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentIndex(idx)
                        }
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Info */}
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

        {/* Similar Products */}
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

function ImageSlide({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="img-fallback">
        Image Not Available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default ProductPage;
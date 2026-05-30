import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const images = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* Product Image */}
      <div className="carousel">
        {images.length > 0 ? (
          <div className="carousel-slide">
            <ImageSlide
              src={images[0]}
              alt={product.name}
            />
          </div>
        ) : (
          <div className="carousel-slide">
            <div className="img-fallback">
              No Image Available
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-size">
          Size: {product.size}
        </p>
      </div>
    </div>
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
      onError={() => setErrored(true)}
    />
  );
}

export default ProductCard;
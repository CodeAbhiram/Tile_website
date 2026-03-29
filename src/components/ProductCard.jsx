function ProductCard({ product }) {
  const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
  const message = `I am interested in ${product.name} (${product.size})`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div style="padding: 2rem; text-align: center; color: #999;">Image\nNot Available</div>`;
          }}
        />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-size">Size: {product.size}</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-enquire">
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ProductCard;

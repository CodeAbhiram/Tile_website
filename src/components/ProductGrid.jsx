import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  const categories = ['All', 'Floor', 'Wall', 'Sanitary', 'CF Fittings'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Collection</h2>

        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;

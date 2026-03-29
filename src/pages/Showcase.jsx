import { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import productsData from '../data/data.json';

function Showcase() {
  const [products] = useState(productsData);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Product Showcase</h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default Showcase;

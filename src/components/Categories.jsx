const categories = [
  {
    title: 'Floor Tiles',
    description: 'Timeless elegance for your floors. Crafted to endure, designed to inspire.',
    icon: '⬜'
  },
  {
    title: 'Wall Tiles',
    description: 'Transform your walls into art. Sophisticated finishes for every room.',
    icon: '🧱'
  },
  {
    title: 'Bathroom Tiles',
    description: 'Create your personal sanctuary. Water-resistant beauty for serene spaces.',
    icon: '🚿'
  },
  {
    title: 'Outdoor Tiles',
    description: 'Extend your living outdoors. Durable luxury that withstands the elements.',
    icon: '🌿'
  }
];

function Categories() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Collections</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-card-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
